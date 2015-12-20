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


    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        Object.prototype.keys = function () {
            var keys = [];
            for (var key in this) if (this.hasOwnProperty(key)) keys.push(key);
            return keys;
        };

        var obj = {a: 1, b: 2, c: 3};
        assert(obj.keys().length === 3, 'obj has three keys');

        Number.prototype.add = function (num) {
            return this + num;
        };
        assert((5).add(3) === 8, '5+3 = 8');
        var n = 5;
        assert(n.add(3) === 8, '5+3 = 8');


        function MyArray() {
        }

        MyArray.prototype = new Array();
        var arr = new MyArray();
        arr.push(1, 2, 3);
        assert(arr.length == 3, 'we have 3 elements in our newArray');
        assert(arr instanceof  Array, 'this object is instance of Array');

        function CorrectArray() {
        }

        var methods = ['push', 'slice', 'pop'];
        // CorrectArray.prototype.length = 0; // book says that we need to use that. but if we didn't, still work.
        for (var i = 0; i < methods.length; i++) {
            (function (name) {
                CorrectArray.prototype[name] = function () {
                    return Array.prototype[name].apply(this, arguments);
                }
            })(methods[i]);

        }
        var corArr = new CorrectArray();
        corArr.push(2, 3, 4, 5, 6);
        corArr.slice(2);
        assert(corArr.length === 5, 'we have 3 element in correct array');
        assert(corArr instanceof Array, 'our new class inst instance of Array');

        function User(first, second) {
            if (this instanceof arguments.callee) {
                this.name = first + ' ' + second;
            }
            else {
                return new User(first, second);
            }
        }

        //for real we should use
        // var name = 'Rukia', but did not work
        this.name = 'Rukia';
        var user = User('Ichigo', 'Kurosaki');
        assert(user, 'user instantiated');
        assert(user.name ==='Ichigo Kurosaki', 'user has correct Name');
        assert(name === 'Rukia', 'the name is Rukia');

        function Test() {
            return this instanceof arguments.callee;
        }

        assert(Test(), 'execute like a function');
        assert(new Test(), 'execute like a constructor');

    })('problems with  prototype');

};
