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
        else if (document.attachElement) {
            self.addEvent = function (elem, type, fn) {
                var bound = function () {
                    return fn.apply(elem, arguments);
                };
                document.attachElement('on' + type, bound);
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
                    event.isDefaultPrevented = returnTrue();
                };

                event.isDefaultPrevented = returnFalse();


                event.stopPropagation = function () {
                    event.cancelBubble = true;
                    event.isPropagationStopped = returnTrue();
                };
                event.isPropagationStopped = returnFalse();

                event.stopImmediatePropagation = function () {
                    this.isImmediatePropagationStopped = returnTrue();
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
        assert(firsData.ninja === div.title , firsData.ninja);
        assert(secondData.ninja === anotherDiv.title, secondData.ninja);

        self.removeData(div);
        self.removeData(anotherDiv);

        assert(self.getData(div).ninja === div.title , 'data was removed');
        assert(self.getData(anotherDiv).ninja === anotherDiv.title, 'Data was successfully removed');

        (function () {
            var nextGuid =1;
            self.addEvent = function (elem, type, fn) {
                var data = self.getData(elem);
                if(!data.handlers) data.handlers = {};
                if(!data.handlers[type]) data.handlers[type] = [];
                if(!fn.guid) fn.guid = nextGuid++;
                data.handlers[type].push(fn);
                if(!data.dispatcher){
                    data.disabled = false;
                    data.dispather = function (event) {
                        if(data.disabled) return;
                        event = fixEvent(event);
                        var handlers = data.handlers[event.type];
                        if(handlers){
                            for(var i = 0; i < handlers.length; i++){
                                handlers[i].call(elem, event);
                            }
                        }
                    };
                }
                if(data.handlers[type].length === 1){
                    if(document.addEventListener){
                        elem.addEventListener(type, data.dispather, false);
                    }
                    else if(document.attachEvent){
                        elem.attachEvent('on'+type, data.dispather);
                    }
                }
            };
        })();

        self.addEvent(div, 'click', function (event) {
           if(this.style){
               this.style.backgroundColor = this.style.backgroundColor === 'green' ? '' : 'green';
           }
        });

        function tidyUp(elem, type){
            function isEmpty(object){
                for(var p in object){
                    return false;
                }
                return true;
            }
            var data = self.getData(elem);
            if(data.handlers[type].length === 0){
                delete data.handlers[type];
                if(document.removeEventListener){
                    elem.removeEventListener(type, data.dispather, false);
                }
                else if(document.detachEvent){
                    elem.detachEvent('on'+type, data.dispather);
                }
            }
            if(isEmpty(data.handlers)){
                delete data.handlers;
                delete data.dispather;
            }
            if(isEmpty(data)){
                self.removeData(elem);
            }

        }



    })('events');
};