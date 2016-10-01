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


        var maxCount = 100, value, elapsed, start, n;
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

    (function (chapterName){
        assert(1,'.');
        assert(1,'.');
        assert(1,'.');
        assert(1,'.');
        assert(0, chapterName);
        assert(0,'.');
        assert(0,'.');
        assert(0,'.');

        (function(w){
            var cache ={};
            w.tmpl = function templ(str, data){
                var fn = cache[str] = cache[str] || new Function('obj',"var  p = [], print = function(){p.push.apply(p, arguments);};" +
                    "with(obj) {p.push('"+
                    str.replace(/[\r\t\n]/g," ").
                        split('<%').join('\t')
                        .replace(/((^|%>)[^t]*)'/g,"$1\r")
                        .replace(/\t=(.*?)%>/g,"',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    +"');}return p.join('');");

                return data ? fn(data) : fn;
            };
        })(window);
        assert(tmpl("Hello, <%= name %>!",{name: "world"}) === "Hello, world!", 'template parsing works well!') ;
        var cachedStr = tmpl("Hello, <%= name %>!");
        assert(cachedStr({name : 'Alejandro'}) === 'Hello, Alejandro!', "pre compile template usage");






    })("with and templates");

};
