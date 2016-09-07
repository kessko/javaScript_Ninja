/**
 * Created by Work on 15-Aug-16.
 */

window.onload = function () {

    (function (chapterName) {
        assert(0, chapterName);

        var use = "other";
        var katana = {
            isSharp: true,
            use: function () {
                this.isSharp = !this.isSharp;
            }
        };
        with (katana) {
            assert(typeof(use) === 'function', 'inside with use is a function');
            assert(use !== 'other', 'and this is not global variable');
            assert(this !== katana, 'context did not changed');
        }
        assert(use === "other", 'outside the with operator we can see global variable');
        assert(typeof(isSharp) == 'undefined', 'isSharp undefined outside with');


        with (katana) {
            isSharp = false;
            cut = function () {
                isSharp = false;
            };
        }
        assert(katana.isSharp === false, 'isSharp equal false');
        assert(typeof (katana.cut) === 'function', 'we create new property in katana object');
        assert(typeof (window.cut) === 'function', 'we create new function in global scope');
        assert(true, '.');
        assert(true, '.');
        assert(true, '.');


        var maxCount = 1000000, value, elapsed, start, n;
        var ninja = {foo: "test"};
        start = new Date().getTime();
        for (n = 0; n < maxCount; n++) {
            value = ninja.foo;
        }
        elapsed = new Date().getTime() - start;
        assert(true, 'elapsed without with ' + elapsed + ' ms');

        start = new Date().getTime();
        with (ninja) {
            for (n = 0; n < maxCount; n++) {
                value = foo;
            }

        }
        elapsed = new Date().getTime() - start;
        assert(true, 'elapsed use with ' + elapsed + ' ms');

        start = new Date().getTime();
        with (ninja) {
            for (n = 0; n < maxCount; n++) {
                 foo = n;
            }

        }
        elapsed = new Date().getTime() - start;
        assert(true, 'elapsed use with and with assignment ' + elapsed + ' ms');

        start = new Date().getTime();
        with (ninja) {
            for (n = 0; n < maxCount; n++) {
                value = "test";
            }

        }
        elapsed = new Date().getTime() - start;
        assert(true, 'elapsed use with without assess ' + elapsed + ' ms');


    })("operator with");
}
