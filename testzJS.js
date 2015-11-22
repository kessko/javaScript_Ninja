//simple function for test
window.onload = function () {
    //test("Firs Async group", function () {
    //    pause();
    //    setTimeout(function(){
    //        assert(true, 'The test suite is running');
    //        assert(false, 'Fail!');
    //        resume();
    //    }, 1000);
    //
    //});
    //
    //test("Second Async group", function () {
    //    pause();
    //    setTimeout(function () {
    //        assert(true, 'Pass!');
    //        assert(true, 'Pass!');
    //        resume();
    //    }, 300);
    //
    //});



};

//async test group
//(function () {
//    var results, queue = [], paused = false;
//    this.assert = function (value, desc) {
//        var li = document.createElement('li');
//        li.className = value ? 'pass' : 'fail';
//        li.appendChild(document.createTextNode(desc));
//        results.appendChild(li);
//        if (!value) {
//            li.parentNode.parentNode.className = 'fail';
//        }
//        return li;
//    };
//    this.test = function (name, fn) {
//        queue.push(function () {
//            results = document.getElementById('results');
//            results = assert(true, name).appendChild(document.createElement('ul'));
//            fn();
//        });
//        runTest();
//
//    };
//    this.resume = function () {
//        paused = false;
//        setTimeout(runTest, 1);
//    };
//    this.runTest = function () {
//        if (!paused && queue.length) {
//            queue.shift()();
//        }
//        if (!paused) {
//            resume();
//        }
//    };
//    this.pause = function () {
//        paused = true;
//    }
//})();


//simple test
(function() {
        this.assert = function (value, desc) {
        var li = document.createElement('li');
        li.className = value ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(desc));
        document.getElementById('results').appendChild(li);

    };
})();