window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');
        (function () {
            var initializing = false,
                superPattern = /xyz/.test(function () {
                    xyz;
                }) ? /\b_super\b/ : /.*/;

            Object.subClass = function (param) {
                var _baseProto = this.prototype;
                initializing = true;
                var _baseInstance = new this();
                initializing = false;
                for (var name in param) {
                    _baseInstance[name] = (typeof param[name] == 'function' &&
                    typeof _baseProto[name] == 'function' &&
                    superPattern.test(param[name]) ) ?
                        (function (name, fn) {
                            return function () {
                                var temp = this._super;
                                this._super = _baseProto[name];
                                var res = fn.apply(this, arguments);
                                this._super = temp;
                                return res;
                            }
                        })(name, param[name]) : param[name];
                }

                function Class() {
                    if (!initializing && this.init)
                        this.init.apply(this, arguments);
                }

                Class.prototype = _baseInstance;
                Class.constructor = Class;
                Class.subClass = arguments.callee;
                return Class;
            }


        })();
        var Person = Object.subClass({
            init: function (name) {
                this.name = name;
            }, dance: function () {
                console.log(this.name, ' can dance');
            }
        });
        var Ninja = Person.subClass({
                init: function () {
                    this._super('Histugaya');
                    console.log(this.name, ' was born to kill.');
                },
                kill: function () {
                    console.log('someone dead');
                },
                dance: function () {
                    this._super();
                    console.log('ITS A LIE. NINJA NEVER DANCE! NEVER!!!!!!!!');
                }
            }
        );

        var alex = new Person('Alex');
        alex.dance();
        var ninja = new Ninja();
        ninja.kill();
        ninja.dance();
    })('first part');

};
