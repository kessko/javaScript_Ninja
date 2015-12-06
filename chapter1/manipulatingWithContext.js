window.onload = function () {

    function bind(context, name) {
        return function () {
            return context[name].apply(context, arguments);
        }
    }

    var button = {
        clicked: false,
        click: function () {
            this.clicked = true;
            assert(button.clicked, 'was clicked!');
            console.log(this);
        }

    };
    var element = document.getElementById('test-btn');
    element.addEventListener('click', bind(button, 'click'));


    Function.prototype.myBind = function () {
        var args = Array.prototype.slice.call(arguments),
            context = args.shift(), fn = this;

        return function () {
            return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
        }
    };

    function alert(one, two, three) {
        var arg = Array.prototype.slice.call(arguments);
        console.log(this);
        for (var index = 0; index < arg.length; index++) {
            assert(0, arg[index]);
        }
    }

    alert('hop', 'hey', 'lalaley');
    var correctFn = alert.myBind({new: 'Object', call: 'Jack'}, 'NEW VALUE', 'THAT GO TO FUNCTION', 'AT FIRST I HOPE');
    correctFn('the last one');

    Function.prototype.partial = function () {
        var args = Array.prototype.slice.call(arguments), fn = this;
        return function () {
            var thatFnIndex = 0;
            for (var i = 0; i < args.length && thatFnIndex < arguments.length; i++) {
                if (args[i] === undefined)
                    args[i] = arguments[thatFnIndex++];
            }
            return fn.apply(this, args);
        }
    };

    String.prototype.csv = String.prototype.split.partial(/,\s*/);

    var result = 'aaa, aaa,bbbb,ddd';
    assert(1, result.csv());

    function showTwoParam(one, two) {
        assert(1, one);
        assert(1, two);
    }

    var correct = showTwoParam.partial(undefined, 'HOHO');
    correct('YES WE CAN');


    var bindClick = document.body.addEventListener.partial('click', undefined, false);
    bindClick(function () {
        assert(1, 'we bind a click');
    });

    function isPrime(num) {
        for (var i = 2; i < num / i; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    Function.prototype.memorized = function (key) {
        this._value = this._value || {};
        return this._value[key] === undefined ? this._value[key] = this.apply(this, arguments) : this._value[key];
    };
    Function.prototype.memoize = function () {
        var fn = this;
        return function () {
            return fn.memorized.apply(fn, arguments);
        }

    };

    assert(isPrime.memorized(89), 'Bind cache');
    assert(isPrime._value[89], 'we have cahed value here');


    var coolMemoFn = isPrime.memoize();
    assert(coolMemoFn(31), 'cool func work');

    assert(isPrime._value[31] === true, 'we have cached value');


    function wrap(object, name, wrapper) {
        var fn = object[name];

        object[name] = function () {
            wrapper.apply(this, [fn.bind(this)].concat(Array.prototype.slice.call(arguments)));
        }
    }


    var testObject = {
        logText: function logText() {
            assert(1, 'old function executing');
        }
    };


    wrap(testObject, 'logText', function (oldFn, val) {
        if (val === 'use new') {
            assert(0, 'new function executing!');
        } else {
            oldFn();
        }
    });

    testObject.logText('use new');
    testObject.logText();


    document.addEventListener('click', (function () {
        var clickNum = 0;
        return function () {
            console.log(++clickNum);
        }
    })(), false);

    $ = function () {
        console.log('we broke jQuery')
    };
    try {
        $(document).click(function () {
            alert('error here');
        });
    }
    catch (e) {
        console.log(e);
    }
    (function ($) {
        $('img').click(function () {
            alert('Work!');
        })
    })(jQuery);

    $ = jQuery;
    var $body = $('body');
    $body.append('<div class="testDiv">One</div>');
    $body.append('<div class="testDiv">Two</div>');
    var $divs = $('div');
    for (var i = 0; i < $divs.length; i++) {
        (function (u) {
            $divs[u].addEventListener('click', function () {
                alert('div #' + u + ' clicked!')
            });
        })(i);


    }

};