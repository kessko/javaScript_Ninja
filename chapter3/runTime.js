window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        assert(eval('5+5') === 10, '5+5 === 10 in eval');
        //we should change context here
        assert(eval.call(window, 'var ninja = 5') == undefined, 'no value was returned');
        assert(ninja === 5, 'variable was created');
        (function () {
            eval('var ninja = 6');
            assert(ninja === 6, 'we create local variable');
        })();

        //this test pass because we change context into 8 line code
        assert(window.ninja === 5, 'the global scope was unaffected');

        //this test failed because we create ninja in GLOBAL scope not in Current!!!
        assert(ninja === 5, 'the global scope was unaffected');


        var ninja = eval("({name : 'Ninja'})");
        assert(ninja != undefined, "we create a Ninja");
        assert(ninja.name === "Ninja", "and the object has expected property");
        var blade = "Doomhammer";
        var fn = eval("(function(){return blade;} )");
        assert(typeof fn === 'function', "we create a function");
        assert(fn() === 'Doomhammer', 'And function works!');
        var ninja2 = eval("{name : 'Ninja'}");

        assert(ninja2 != undefined, "we create ninja2");
        assert(ninja2.name === "Ninja", "but not really what we think");


        var fn = new Function("a","b", "return a+b;");
        assert(typeof fn === "function", "we create a function use constructor");
        assert(fn(1,3) === 4 , "and our function works" );

        var timer = window.setTimeout('alert("Hi!")',1000);


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


        (function () {
            globalEval("var test = 100;");
        })();

        assert(test === 100,"we create variable into global SCOPE");


        function addMethod(object, funcName, fn) {
            var prevFn = object[funcName];
            object[funcName] = function(){
                if(arguments.length !== fn.length && typeof prevFn === 'function'){
                    prevFn.apply(this,arguments);
                }
                else{
                    fn.apply(this,arguments);
                }
            };
        }
        var obj = {};

        addMethod(obj,'add',function () {
           console.log('empty');
        });

        addMethod(obj,'add',function (text, prefix) {
            console.log("_"+prefix+" : "+text);
        });

        addMethod(obj,'add',function (text) {
            console.log(text);
        });



        obj.add();
        obj.add('WAKA WAKA');
        obj.add("alloha","ISE_Standard");


    })('Runtime');
};
