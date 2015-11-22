window.onload = function () {
    function useless(callback) {
        return callback();
    };
    var text = 'Doma arigato!';
    assert(true, 'test');
    assert(useless(function () {
            return text;
        }) === text, text);

    function isNumber() {
        return true;
    }

    assert(typeof isNumber === 'function', 'isNumber() defined');
    assert(isNumber.name == 'isNumber', 'isNumber has a name');

    var canFly = function () {
        return true;
    };
    assert(typeof canFly === 'function', 'canFly() defined');
    assert(canFly.name === '', 'canFly() has no name');

    window.isDelay = function () {
        return true;
    };
    assert(typeof window.isDelay === 'function', 'isDelay() defined');
    assert(window.isDelay.name === '', 'isDelay() has no name');

    function outer() {
        assert(typeof  inner === 'function', 'inner() in scope before declaration');

        function inner() {
        }

        assert(typeof  inner === 'function', 'inner() in scope after declaration');

        assert(window.inner === undefined, 'inner() not in global scope');

    }

    outer();

    assert(window.inner === undefined, 'inner() still not in global scope');

    window.wieldsSword = function swingsSword() {
        return true;
    };

    assert(window.wieldsSword.name === 'swingsSword', 'real name of wieldsSword is swingsSword');

    function creep() {
        return this;
    }

    var ninja = {skull: creep};
    var samurai = {skull: creep};
    assert(ninja.skull() === ninja, 'ninja skull context is a ninja :)');
    assert(samurai.skull() == samurai, 'samurai context is a samurai');


    function Ninja() {
        this.skull = function () {
            return this;
        }

    };

    ninja = new Ninja();
    ninja2 = new Ninja();

    assert(ninja.skull() === ninja, 'empty object equal ninja');
    assert(ninja2.skull() === ninja2, 'empty object equal ninja2');
    assert(ninja.skull() === ninja2.skull(), 'who ker?');
    var watever = Ninja();

    //call and apply

    function juggle() {
        var results = 0;
        for (var i = 0; i < arguments.length; i++) {
            results += arguments[i];
        }
        if (this.results) {
            this.results += results;
        }
        else {
            this.results = results;
        }
    }

    var firstObj = {};
    var secondObj = {results: 100};
    juggle.call(firstObj, 1, 2, 3);
    juggle.apply(secondObj, [2, 3, 4]);

    assert(firstObj.results === 6, 'SIX');
    assert(secondObj.results === 109, 'ONE HUNDRED AND NINE');

    //my own forEach

    function forEach(collection, callback, cancellationToken) {
        if (!(collection instanceof Array)) {
            return console.log(collection, ' is not a Array');
        }
        if (!(callback instanceof Function)) {
            return console.log(callback, ' is not a Function');
        }
        for (var i = 0; i < collection.length; i++) {
            if (cancellationToken && cancellationToken.reject) {
                console.log('rejected!!!!!!!!!!');
                return;
            }
            callback.call(collection[i], i);

        }
    }
    function infinite(cancellationToken){
        for(var i =0 ; ;i++){
            console.log('im working ',i,' ...');
            if(cancellationToken && cancellationToken.rejected){
                return;
            }
        }
    }


    var list = ["one", "two", "three", "four", "five"];

    forEach(list, function (n) {
        assert(this.toString() === list[n], 'Be master of ' + list[n]);
    });
    //   forEach([1, 2, 3], 2);
    var superArray = [];
    for (var n = 0; n < 100; n++) {
        superArray.push(n);
    }
    var self = this;
    self.token = {};
    document.getElementById('stopForEach').onclick = function () {
        self.token.reject = true;
    }

  //  infinite(self.token);

    //forEach(superArray, function () {
    //    var self = this;
    //    console.log(self);
    //}, self.token);


};


/**
 * Created by Evgen on 14.11.2015.
 */
