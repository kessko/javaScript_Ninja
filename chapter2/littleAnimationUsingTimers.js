window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        var timers = {
            timers: [],
            timerId: 0,
            add: function (fn) {
                this.timers.push(fn);
            },

            start: function () {
                if (timers.timerId) return;
                (function runNext() {
                    for (var i = 0; i < timers.timers.length; i++) {
                        if (timers.timers[i]() === false) {
                            timers.timers.splice(i, 1);
                        }
                    }
                    timers.timerId = setTimeout(runNext, 20);
                })();
            },
            stop: function () {
                clearTimeout(this.timerId);
                this.timerId = 0;
            }


        };

        var body = document.getElementsByTagName('body')[0];
        var div = document.createElement('div');
        div.style.top = '60px';
        div.style.left = '60px';
        div.style.position = 'absolute';
        div.appendChild(document.createTextNode('Hello world!'));

        body.appendChild(div);


        var y = 60;
        var x = 60;
        timers.add(function () {
            div.style.left = x + 'px';
            if (++x > 500) return false;
        });
        timers.add(function () {
            div.style.top = y + 'px';
            if (++y > 500) return false;
        });

        timers.start();
        timers.start(); //it would prevented


        var queue = [];
        var paused = false;
        this.test = function (fn) {
            queue.push(fn);
            runTest();
        };

        this.pause = function () {
            paused = true;
        };

        this.resume = function () {
            paused = false;
            setTimeout(runTest, 1);
        };

        function runTest() {
            if (!paused && queue.length) {
                queue.shift()();
                if (!paused) resume();
            }
        }

        test(function () {
            for (var i = 0; i < 10000; i++) {
                console.log(i + ' ms');
            }
        });
        test(function () {
            for (var i = 0; i < 10000; i++) {
                console.log(i + ' fs');
            }
        });


    })('Animation and timers');
};
