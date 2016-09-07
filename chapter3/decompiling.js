/**
 * Created by Work on 15-Aug-16.
 */

window.onload = function () {

    (function (chapterName) {
        assert(0, chapterName);
        assert(0, '');
        var funcArgsName = function (fn) {
            var pattern = /^.*function\s*\(\s*([^)]*?)\s*\)/g;
            var res = pattern.exec(fn.toString());

            return res && res[1] ? res[1].split(/,\s*/g) : [];
        };

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


        function globalEval(data) {
            data = data.replace(/^\s*|\s*$/g,"");
            if(data){
                var head = document.getElementsByTagName("head")[0] || document.documentElement;
                var script = document.createElement("script");

                script.type = "text/javascript";
                script.text = data;

                head.appendChild(script);
                head.removeChild(script);
            }
        }

        var scripts = document.getElementsByTagName("script");
        var i = scripts.length;
        while(i--){
            if(scripts[i].type === "x/onload"){
                globalEval(scripts[i].innerHTML);
            }
        }


    })("decompiling");
}
