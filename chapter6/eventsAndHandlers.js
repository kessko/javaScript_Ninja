window.onload = function () {
    (function (chapterName) {
        assert(1, chapterName);
        var self = window;
        if (self.addEventListener) {
            self.addEvent = function (elem, type, fn) {
                elem.addEventListener(type, fn, false);
                return fn;
            };
            self.removeEvent = function (elem, type, fn) {
                elem.removeEventListener(type, fn, false);
            };
        }
        else if (document.attachEvent) {
            self.addEvent = function (elem, type, fn) {
                var bound = function () {
                    return fn.apply(elem, arguments);
                };
                document.attachEvent('on' + type, bound);
                return bound;
            };
            self.removeEvent = function (elem, type, fn) {
                document.detachEvent('on' + type, fn);
            }
        }

        var div = document.createElement('div');
        div.innerText = 'Click me ';
        var anotherDiv = document.createElement('div');
        anotherDiv.innerText = 'But only once!';
        document.body.appendChild(div);
        document.body.appendChild(anotherDiv);

        var elements = document.getElementsByTagName('div');
        var i = elements.length;
        while (i--) {
            (function (el) {
                var handler = self.addEvent(el, 'click', function () {
                    this.style.backgroundColor = this.style.backgroundColor === '' ? 'green' : '';
                    self.removeEvent(el, 'click', handler);
                });
            })(elements[i]);
        }

        var fixEvent = function (event) {
            function returnTrue() {
                return true
            }

            function returnFalse() {
                return false
            }

            if (!event || !event.stopPropagation) {
                var old = event || window.event;
                event = {};
                for (var p in old) {
                    event[p] = old[p];
                }

                if (!event.target) {
                    event.target = event.srcElement || document;
                }
                if (!event.relatedTarget) {
                    event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
                }

                event.preventDefault = function () {
                    event.returnValue = false;
                    event.isDefaultPrevented = returnTrue;
                };

                event.isDefaultPrevented = returnFalse;


                event.stopPropagation = function () {
                    event.cancelBubble = true;
                    event.isPropagationStopped = returnTrue;
                };
                event.isPropagationStopped = returnFalse;

                event.stopImmediatePropagation = function () {
                    this.isImmediatePropagationStopped = returnTrue;
                    this.stopPropagation();
                };

                event.isImmediatePropagationStopped = returnFalse();
                if (event.clientX != null) {
                    var doc = document.documentElement, body = document.body;
                    event.pageX = event.clientX + (doc && doc.scrollLeft || body.scrollLeft || 0 )
                        - (doc && doc.clientLeft || body && body.clientLeft || 0);

                    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0)
                        - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                event.which = event.charCode || event.keyCode;

                if (event.button != null) {
                    event.button = ( event.button & 1 ? 0 : (event.button & 4 ? 1 : (event.button & 2 ? 2 : 0)));
                }

            }
            return event;

        };

        (function () {
            var guidCounter = 1, expando = 'data' + (new Date).getTime();
            var self = window;
            var cache = {};
            self.getData = function (elem) {
                var guid = elem[expando];
                if (!guid) {
                    guid = elem[expando] = guidCounter++;
                    cache[guid] = {};
                }
                return cache[guid];
            };
            self.removeData = function (elem) {
                var guid = elem[expando];
                if (!guid) return;
                delete cache[guid];
                try {
                    delete elem[expando];
                }
                catch (e) {
                    if (elem.removeAttribute)
                        elem.removeAttribute(guid);
                }
            }
        })();

        div = document.createElement('div');
        div.innerText = 'Waka!';
        div.title = "Ninja power!";
        anotherDiv = document.createElement('div');
        anotherDiv.innerText = 'Maka for!';
        anotherDiv.title = "Secret information here";
        document.body.appendChild(div);
        document.body.appendChild(anotherDiv);

        var firsData = self.getData(div);
        var secondData = self.getData(anotherDiv);

        firsData.ninja = div.title;
        firsData.wow = 1111;
        secondData.ninja = anotherDiv.title;
        assert(firsData.ninja === div.title, firsData.ninja);
        assert(secondData.ninja === anotherDiv.title, secondData.ninja);

        self.removeData(div);
        self.removeData(anotherDiv);

        assert(self.getData(div).ninja === div.title, 'data was removed');
        assert(self.getData(anotherDiv).ninja === anotherDiv.title, 'Data was successfully removed');

        (function () {
            var nextGuid = 1;
            var isEvetSupported = function (type) {
                var div = document.createElement('div'),
                    isSupported;
                var eventType = 'on' + type;
                isSupported = (eventType in div);
                if (!isSupported) {
                    div.setAttribute(eventType, 'return;');
                    isSupported = typeof div[eventType] === 'function';
                }
                div = null;
                return isSupported;
            };
            var isInForm = function (elem) {
                var parent = elem.parentNode;
                while (parent) {
                    if (parent.nodeName.toLowerCase() === 'form') return true;
                    parent = parent.parentNode;
                }
                return false;
            };

            function triggerSubmitOnClick(e) {
                var target = e.target;
                if (target.type === 'submit' || target.type === 'image' && isInForm(target)) {
                    return triggerEvent(this, 'submit');
                }
            }

            function triggerSubmitOnKeypress(e) {
                var target = e.target;
                if (target.type === 'text' || target.type === 'password'
                    && isInForm(target) && e.keyCode === 13) {
                    return triggerEvent(this, 'submit');
                }
            }

            var isSubmitSupported = isEvetSupported('submit');
            self.addEvent = function (elem, type, fn) {
                var data = self.getData(elem);
                if (!data.handlers) data.handlers = {};
                if (!data.handlers[type]) data.handlers[type] = [];
                if (!fn.guid) fn.guid = nextGuid++;
                data.handlers[type].push(fn);
                if (!data.dispatcher) {
                    data.disabled = false;
                    data.dispather = function (event) {
                        if (data.disabled) return;
                        event = fixEvent(event);
                        var handlers = data.handlers[event.type];
                        if (handlers) {
                            for (var i = 0; i < handlers.length; i++) {
                                handlers[i].call(elem, event);
                            }
                        }
                    };
                }
                if (data.handlers[type].length === 1) {
                     if (type === "submit" && !isSubmitSupported && elem.nodeName.toLowerCase() !=='form') {
                         addEvent(elem, 'click',triggerSubmitOnClick);
                         addEvent(elem, 'keypress',triggerSubmitOnKeypress);
                     }
                    if (document.addEventListener) {
                        elem.addEventListener(type, data.dispather, false);
                    }
                    else if (document.attachEvent) {
                        elem.attachEvent('on' + type, data.dispather);
                    }
                }
                return fn;
            };
            function tidyUp(elem, type) {
                function isEmpty(object) {
                    for (var p in object) {
                        return false;
                    }
                    return true;
                }

                var data = self.getData(elem);
                if(type === 'submit' && !isSubmitSupported && elem.nodeName.toLowerCase() !== 'form' && data.handlers[type].length === 0){
                    removeEvent(elem, 'click',triggerSubmitOnClick);
                    removeEvent(elem, 'keypress', triggerSubmitOnKeypress);
                }
                if (data.handlers[type].length === 0) {
                    delete data.handlers[type];
                    if (document.removeEventListener) {
                        elem.removeEventListener(type, data.dispather, false);
                    }
                    else if (document.detachEvent) {
                        elem.detachEvent('on' + type, data.dispather);
                    }
                }
                if (isEmpty(data.handlers)) {
                    delete data.handlers;
                    delete data.dispather;
                }
                if (isEmpty(data)) {
                    self.removeData(elem);
                }

            }
            self.removeEvent = function (elem, type, fn) {
                function isEmpty(object) {
                    for (var p in object) {
                        return false;
                    }
                    return true;
                }

                var data = getData(elem);
                if (!data || isEmpty(data)) return;
                var removeType = function (t) {
                    data.handlers[t] = [];
                    tidyUp(elem, t);
                };
                if (!type) {
                    for (var t in data.handlers) {
                        removeType(t);
                    }
                    return;
                }
                var handlers = data.handlers[type];
                if (!handlers) return;
                if (!fn) {
                    removeType(type);
                    return;
                }
                if (fn.guid) {
                    for (var i = 0; i < handlers.length; i++) {
                        if (handlers[i].guid === fn.guid) {
                            handlers.splice(i--, 1);
                        }
                    }
                }
                tidyUp(elem, type);
            }
        })();

        self.addEvent(div, 'click', function (event) {
            if (this.style) {
                this.style.backgroundColor = this.style.backgroundColor === 'green' ? '' : 'green';
            }
        });

        var counter = 0;
        //fix for IE 8
     var moFn =    self.addEvent(anotherDiv, 'mouseover', function (event) {
            event.target.innerText = (event.target.innerText + '  ' + counter++);
            if (counter > 9) {
                self.removeEvent(this, 'mouseover', moFn);
            }
        });
        self.addEvent(anotherDiv, 'click', function (event) {
            if (this.style)
                this.style.marginLeft = (counter++ * 10) + 'px';
        });

        self.triggerEvent = function (elem, event) {
            var data = getData(elem);
            var parent = elem.parentNode || elem.ownerDocument;

            if (typeof  event === "string") {
                event = {type: event, target: elem};
            }
            event = fixEvent(event);
            if (data.dispather) {
                data.dispather.call(elem, event);
            }
            if (parent && !event.isPropagationStopped()) {
                triggerEvent(parent, event);
            }
            else if (!parent && !event.isDefaultPrevented()) {
                var targetData = getData(event.target);
                if (event.target[event.type] != null && typeof event.target[event.type] === 'function') {
                    targetData.disabled = true;
                    event.target[event.type]();
                    targetData.disabled = false;

                }
            }
        };
        setTimeout(function () {
            self.triggerEvent(anotherDiv, 'mouseover')
        }, 2000);

        //set the picture and button
        var btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'Start!';
        document.body.appendChild(btn);
        var img = document.createElement('img');
        img.className = 'loader';
        img.src = 'chapter6/free-gif-preloaders-psds-03.gif';
        img.style.display = 'none';
        document.body.appendChild(img);


        self.addEvent(document.body, 'ajax-start', function () {
            var loader = document.getElementsByClassName('loader')[0];
            loader.style.display = 'block';
        });
        self.addEvent(document.body, 'ajax-end', function () {
            var loader = document.getElementsByClassName('loader')[0];
            loader.style.display = 'none';
        });
        function simulateAjaxRequest(target) {
            self.triggerEvent(target, 'ajax-start');
            setTimeout(function () {
                self.triggerEvent(target, 'ajax-end');
            }, 4000);
        }

        self.addEvent(btn, 'click', function () {
            simulateAjaxRequest(this);
        });

        var input = document.getElementById('testSubmit');
      var testSubmitFn=  self.addEvent(input,'submit', function (e) {
            self.removeEvent(input, 'submit',testSubmitFn);
            console.log('work?');
            setTimeout(function () {
                self.removeEvent(input, 'submit',testSubmitFn);
            }, 1500);
        })



    })('events');
};