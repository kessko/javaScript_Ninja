/**
 * Created by Work on 15-Aug-16.
 */

window.onload = function () {

    (function (chapterName) {
        assert(0, chapterName);
        assert(0, '');
        var funcArgsName = function (fn) {
            var pattern = /^.*function\s*\((\s*[^)]*?)\s*\)/g;
            var res = pattern.exec(fn.toString());

            return res && res[1] ? res[1].split(/\s*,\s*/g) : [];
        }

        assert(funcArgsName(function () {
                return window;
            }).length === 0, 'function without parameters');
        var res = funcArgsName(function (a, b, c) {
            return window;
        });

        assert(res[0] === 'a' && res[1] === 'b' && res[2] === 'c', 'parameter names parse correct');

        var json = "{'name' : 'Ninja'}";
        var obj = eval("(" + json + ")");
        assert(obj.name === "Ninja", 'we parse Json');
    })("decompiling");
}
