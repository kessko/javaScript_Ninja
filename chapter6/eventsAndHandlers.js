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
                if(event.clientX != null){
                    var doc = document.documentElement, body = document.body;
                    event.pageX = event.clientX + (doc && doc.scrollLeft  || body.scrollLeft || 0 )
                    - (doc && doc.clientLeft || body &&  body.clientLeft || 0);

                    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0)
                    - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                event.which = event.charCode || event.keyCode;

                if(event.button != null){
                    event.button = ( event.button & 1 ? 0 : (event.button & 4 ? 1 : (event.button & 2 ? 2 : 0)));
                }

            }
            return event;

        }


    })('events');
};