window.onload = function () {

    function useClousures() {
        var outerVal = 'ninja';
        var later;

        function outerFn() {
            var innerVal = 'samurai';

            function innerFn() {
                assert(outerVal, 'i can see ninja');
                assert(innerVal, 'i can see samurai');


            }

            later = innerFn;
        }

        outerFn();
        later();

    }

    useClousures();
    function useComplicetedClousures() {
        var outerVal = 'ninja';
        var later;


        function outerFn() {

            assert(tooLate, 'Not yet');
            function innerFn(param) {
                assert(outerVal, 'i can see ninja');
                assert(innerVal, 'i can see samurai');
                assert(param, 'i can see wakhizaki');
                assert(tooLate, 'i  can see tooLate variable here');
            }

            later = innerFn;
            var innerVal = 'samurai';

        }

        assert(!tooLate, 'tooLate is undefined');


        outerFn();
        var tooLate = 'too late';
        later('wakhizaki');


    }

    useComplicetedClousures();

    function Ninja() {
        var feints = 0;

        this.getFeints = function () {
            return feints;
        };
        this.feint = function () {
            feints++;
        }
    }


    var ninja = new Ninja();

    assert(ninja.getFeints() === 0, 'zero feints');
    ninja.feint();

    assert(ninja.getFeints() === 1, 'we have one now');

    var ninjasFeints = ninja.getFeints();

    ninjasFeints = 100;

    ninja.feint();

    assert(ninja.getFeints() === 101, 'im wrong');

    assert(ninja.feints, 'its a private variable');


    var $elem = $('#ajaxResponse');

    $('#clean').click(function () {
        $elem.html('');
    });

    document.getElementById('go').onclick = function () {
        testAjax()
    };

    function testAjax() {
        //var $elem = $('#ajaxResponse');
        $elem.html('Loading ...');

        $.ajax({
            url: 'response/testResponse.html',
            type: "GET"
        }).then(function (data) {
            setTimeout(function () {
                $elem.html(data);

            }, 1000);
        });
    }

    function animateId(elemId){
        var elem = document.getElementById(elemId);
        var tick =0 ;
        var timer = setInterval(function(){
            if(tick <1000){

                elem.style.left = elem.style.top = tick +'px';
                tick++;
            }
            else{
                clearInterval(timer);
                assert(tick, 'we have tick');
                assert(timer, 'and we have a timer');
                assert(elem, 'and we have asses to elem here');
            }
        }, 10);
    }
   $('#start-animate').click(function(){
       animateId('animatedDiv');
   });
}
;
