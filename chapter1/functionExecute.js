/**
 * Created by Work on 22-Nov-15.
 */
window.onload = function () {
    var obj = {};
    var fn = function () {

    };
    assert(obj && fn, 'we have function and object');

    fn.prop = 'function property';
    obj.prop = 'object property';

    assert(fn.prop, 'we can add property to the function. like this ' + fn.prop);

    var storage = {
        functionIndex: 1,
        add: function (fn) {
            if (!fn.id) {
                fn.id = storage.functionIndex++;

                return !!(   storage.cache[fn.id] = fn);
            }

        },
        cache: []
    };
    var emptyFn = function () {
    };

    assert(storage.add(emptyFn), 'was added');
    assert(!storage.add(emptyFn), "wasn't added again");


    function isPrime(value) {
        if (!isPrime.answer) {
            isPrime.answer = {}
        }
        if (isPrime.answer[value] != null) {
            return isPrime.answer[value];
        }
        var prime = value != 1;
        for (var i = 2; i < value / i; i++) {
            if (value % i === 0) {
                prime = false;
                break;
            }
        }
        return isPrime.answer[value] = prime;
    }

    assert(isPrime(5), '5 is prime number');
    assert(isPrime.answer[5], 'now we use cached value');


    function getElement(name) {
        if (!getElement.cache) {
            getElement.cache = {};
        }
        return getElement.cache[name] = getElement.cache[name] || document.getElementsByName(name);

    }

    assert(getElement('body'), 'we get body');
    assert(getElement.cache['body'], 'and get this from cache!');

    var elems = {
        length: 0,
        add: function (elem) {
            Array.prototype.push.call(this, elem);
        },
        gather: function (id) {
            this.add(document.getElementById(id));
        }

    };
    elems.gather('first');
    assert(elems.length === 1 && elems[0].nodeType, 'we have 1 element in collection');
    elems.gather('second');
    assert(elems.length === 2 && elems[1].nodeType, 'now we have 2 element. yeap!');


    var smallest = function (array) {
        return Math.min.apply(Math, array);
    };
    var largest = function (array) {
        return Math.max.apply(Math, array);
    };

    assert(smallest([1, 2, 3, 4, 5]) === 1, '1 was the smallest number oin array');
    assert(largest([99, 44, 1, 8]) === 99, '99 is the biggest number in the array');

    function merge(root) {
        for (var i = 0; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    root[key] = arguments[i][key];

            }
        }
        return root;
    }

    var merged = merge({first: 'first element'}, {second: 'second element'});
    assert(merged.first === 'first element', 'first merged element');
    assert(merged.second === 'second element', 'second merged element');

    function multupleFirstWithMax(first) {
        return first * Math.max.apply(Math, Array.prototype.slice.call(arguments, 1));
    }

    var result = multupleFirstWithMax(1, 2, 3, 4, 5);
    assert(result === 5, 'yiiiiiiii');

    function makeNinja(name) {
    }

    function makeSamurai(name, rank) {
    }

    assert(makeNinja.length === 1, 'make ninja have 1 argument');
    assert(makeSamurai.length === 2, 'make smurai have 2 arguments');


    // this code make me seek

    function addMethod(object, name, fn) {
        var old = object[name];

        object[name] = function () {
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
            }
            else if (typeof  old == 'function') {
                return old.apply(this, arguments);
            }
        }
    }

    var smartGuy = {};
    addMethod(smartGuy, 'whatever', function (a, b) {
        console.log(a, '  ', b)
    });

    addMethod(smartGuy, 'whatever', function (a) {
        console.log(a)
    });

    addMethod(smartGuy, 'whatever', function () {
        console.log('empty')
    });


    smartGuy.whatever('ff', 'ww');
    smartGuy.whatever();
    smartGuy.whatever('ff');


    var proNinjas = {
        names: ['Alex Shveds', 'Viktor Buza', 'Nikitin Boris', 'Alex Mahouni']
    };


    addMethod(proNinjas, 'find', function () {
        return this.names;
    });
    addMethod(proNinjas, 'find', function (firsName) {
        var result = [];
        for (var i = 0; i < this.names.length; i++) {
            if (this.names[i].indexOf(firsName) === 0)
                result.push(this.names[i]);
        }
        return result;
    });
    addMethod(proNinjas, 'find', function (firstName, lastName) {
        var result = [];
        for (var i = 0; i < this.names.length; i++) {
            if (this.names[i] === (firstName + ' ' + lastName))
                result.push(this.names[i]);
        }
        return result;
    });


    assert(proNinjas.find('Alex').length === 2, 'we found Alex Shveds and Alex Mahouni');
    assert(proNinjas.find('Viktor', 'Buza').toString() === 'Viktor Buza', 'we found Viktor Buza');
    assert(proNinjas.find().length === 4, 'all result contains 4 element');

    var justFunction = function (){};
    assert( typeof justFunction == 'function', 'function has type - function ^)');

    function isFunction(fn){
     return Object.prototype.toString.call(fn) == '[object Function]';
    }

    assert(isFunction(justFunction), 'this is a function');

};