window.onload = function () {
    assert(1, 'i am ready');
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

};
