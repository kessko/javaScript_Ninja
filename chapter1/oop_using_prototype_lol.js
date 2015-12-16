window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');
        function Ninja() {
            this.swung = false;
            this.swingSword = function () {
                return !this.swung;
            };

        }

        var firstNinja = Ninja();
        assert(firstNinja === undefined, 'this object should be empty');

        Ninja.prototype.swingSword = function () {
            return this.swung;
        };

        var secondNinja = new Ninja();

        assert(secondNinja && secondNinja.swingSword && secondNinja.swingSword(), 'the constructor has more prioritize then prototype');

        Ninja.prototype.anotherProp = 'just a text';

        assert(secondNinja.anotherProp, secondNinja.anotherProp);
        assert(typeof secondNinja == 'object', 'ninja link is an object');
        assert(secondNinja instanceof Ninja, 'ninja link was created by Ninja constructor');
        assert(secondNinja.constructor == Ninja, 'the constructor of ninja link  is Ninja )');


        var testNinja = new Ninja();
        var testNinja2 = new testNinja.constructor();

        assert(testNinja2 instanceof Ninja, 'test ninja 2 is instance of Ninja ');
        assert(testNinja !== testNinja2, 'but ninja one isn\'t equal ninja2');
    })('first part');

    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');
        function Person() {
        }

        Person.prototype.dance = function () {
        };

        function Ninja() {
        }

        Ninja.prototype = {dance: Person.prototype.dance};
        var ninja = new Ninja();
        assert(ninja instanceof Ninja, 'ninja instanceof Ninja');
        assert(ninja instanceof Person, 'ninja instanceof Person');
        assert(ninja instanceof Object, 'ninja instanceof Object');
        assert(ninja.dance, 'Ninja can dance!');


    })('second part');

    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');
        function Person() {
        }

        Person.prototype.dance = function () {
        };

        function Ninja() {
        }

        Ninja.prototype = new Person();
        var ninja = new Ninja();
        assert(ninja instanceof Ninja, 'ninja instanceof Ninja');
        assert(ninja instanceof Person, 'ninja instanceof Person');
        assert(ninja instanceof Object, 'ninja instanceof Object');
        assert(ninja.dance, 'Ninja can dance!');

        if (!Array.prototype.myForEach) {
            Array.prototype.myForEach = function (callback, context) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(context || null, this[i], i, this);
                }
            }

        }

        [77, 16, 2, 54, 100].myForEach(function (elem, index, array) {
            console.log(this);
            console.log(elem);
            console.log(index);
            console.log(array);
            console.log('-------------------');
        }, {context: 'THI IS CON-TEXT!'});


    })('third part');
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        HTMLElement.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
        var firs = document.createElement('div');
        firs.innerHTML = 'Some text';
        firs.id = 'first';
        var second = document.createElement('div');
        second.innerHTML = 'Second Text';
        second.id = 'second';

        document.body.appendChild(firs);
        document.body.appendChild(second);

        firs.parentNode.removeChild(firs);

        second.remove();
        assert(1, 'deleting from DOM are successful');
        assert(document.getElementById('first'), 'element first was deleted');
        assert(document.getElementById('second'), 'element second was deleted');


    })('DOM manipulating');

};
