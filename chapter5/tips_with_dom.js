window.onload = function () {

    (function (chapterName) {
        assert(1, chapterName);
        assert(1, '.');
        assert(1, '.');

        var div = document.createElement('div');
        div.innerHTML = 'text<img id="first-img" src="chapter5/download.jpg"></img>' +
            'text <img id="second-img" style="display: none;" src="chapter5/download.jpg"></img>';
        document.body.appendChild(div);
        var firstImg = document.getElementById('first-img');
        var secondImg = document.getElementById('second-img');
        (function () {
            window.getSize = function(elem){
                var previousProp = {};
                var requiredProp = {
                    display :'block',
                    visibility : 'hidden',
                    position : 'absolute'
                };

                if(elem != undefined){
                    for(var key in requiredProp){
                        previousProp[key] = elem.style[key];
                        elem.style[key] = requiredProp[key];
                    }

                    var resultSize  = {
                        offsetHeight : elem.offsetHeight,
                        offsetWidth: elem.offsetWidth
                    };

                    for(var key in previousProp){
                        elem.style[key] = previousProp[key];
                    }
                    return resultSize;
                }
            }
        })();

        setTimeout(function(){
            assert(firstImg.offsetWidth === 243, firstImg.offsetWidth);
            assert(firstImg.offsetHeight === 212, firstImg.offsetHeight);
            assert(secondImg.offsetWidth === 243, secondImg.offsetWidth);
            assert(secondImg.offsetHeight === 212, secondImg.offsetHeight);
            var correctSize = getSize(secondImg);
            assert(correctSize.offsetWidth === 243, correctSize.offsetWidth);
            assert(correctSize.offsetHeight === 212, correctSize.offsetHeight);

        },1000);


    })('tips and tricks witch DOM');
}