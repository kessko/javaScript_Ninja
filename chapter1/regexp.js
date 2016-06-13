window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        function isThisAZipCode(candidate) {
            if (candidate.length !== 10 || typeof candidate !== 'string')return false;
            for (var i = 0; i < candidate.length; i++) {
                if (i !== 5 && (candidate[i] < '0' || candidate[i] > '9'))
                    return false;
                else if (i === 5 && candidate[i] !== '-')return false;
            }
            return true;
        }

        assert(isThisAZipCode('a1212-1111'), 'correct');
        assert(/^\d{5}-\d{4}$/.test('98765-2354'), 'correct');

        var r1 = /test/;
        var r2 = new RegExp('test');

        assert(r1.test('test'), 'found test');
        assert(r1.test('test'), 'and here the same result');
        assert(r1 === r2, 'object are not the same');
        assert(r1.toString() === r2.toString(), 'but they have equals toString() exemplar');


        $(document.body).append('<div class="ninja elephant"></div>' +
            '<div class="elephant"></div>' +
            '<span class="ninja"></span>');
        function countOfElementWithClass(className, type) {
            var elements = document.getElementsByTagName(type || '*');
            var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');
            var result = [];
            for (var i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    result.push(elements[i]);
                }
            }
            return result;
        }

        assert(countOfElementWithClass('ninja', 'div').length === 1, 'we have 1 div with ninja class');
        assert(countOfElementWithClass('elephant', 'div').length === 2, 'we have 2 div with elephant class');
        assert(countOfElementWithClass('ninja').length === 2, 'at least we have 2 element with class ninja');

    })
    ('first part');

    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        $(document.body).append('<div id="opacity" style="filter: alpha(opacity=50); opacity: 0.5;"></div>');
        function getElementOpacity(elem) {
            var filter = elem.style.filter;
            return filter ? filter.indexOf("opacity") >= 0 ? (parseFloat(filter.match(/opacity=([^)]+)/)[1]) / 100 + "") : "" : elem.style.opacity;

        }

        assert(getElementOpacity(document.getElementById('opacity')) === "0.5", 'element has 0.5 opacity');

        var html = "<div class='test'><b>Hello</b><i>World!</i></div>";

        var result = html.match(/<(\/?)(\w+)([^>]*?)>/);

        assert(result[0] === "<div class='test'>", "found first teg");
        assert(result[1] === "", "missing slash");
        assert(result[2] === "div", "tag name");
        assert(result[3] === " class='test'", "attribute");

        result = html.match(/<(\/?)(\w+)([^>]*?)>/g);

        assert(result[0] === "<div class='test'>", "found first teg");
        assert(result[1] === "<b>", "found b tag");
        assert(result[2] === "</b>", "found close b tag");
        assert(result[3] === "<i>", "found open i tag");
        assert(result[4] === "</i>", "found close i tag");
        assert(result[5] === "</div>", "found close div tag");

        var tag = /<(\/?)(\w+)([^>]*?)>/g;
        var match, num = 0;
        while ((match = tag.exec(html)) != null) {
            assert(match.length === 4, 'we have 4 matches');
            num++;
        }

        assert(num === 6, "we have 3 opening and 3 close tags");

        html = "<b class='some-calss' title='test-title'>Hello</b><i>World!</i>";
        var pattern = /<(\w+)([^>]*?)>(.*?)<\/\1>/g;

        result = pattern.exec(html);
        assert(result[0] === "<b class='some-calss' title='test-title'>Hello</b>", 'tab name');
        assert(result[1] === 'b', 'tab name');
        assert(result[2] === " class='some-calss' title='test-title'", 'atrr');
        assert(result[3] === 'Hello', 'tag content');

        result = pattern.exec(html);
        assert(result[0] === "<i>World!</i>", 'tab name');
        assert(result[1] === 'i', 'tab name');
        assert(result[2] === '', 'attr');
        assert(result[3] === 'World!', 'content');

        assert(0, 'next step');

        assert('fontFamily'.replace(/([A-Z])/g, '-$1').toLowerCase() === "font-family", 'convert camelcase to dashed notation');
        pattern = /((?:ninja-)+)sword/;

        assert("ninja-sword and ninja-sword".match(pattern)[1] === "ninja-", "capture only need word");

        function upper(all, letter) {
            console.log(all);
            return letter.toUpperCase();
        }

        assert("bold-bottom-width".replace(/-(\w)/g, upper) == "boldBottomWidth", "Convert to camel Case :)");


        function compress(source) {
            var result = [];
            var keys = {};
            var pattern = /([^=&]+)=([^&]+)/g;

            function combiner(all, key, value) {
                keys[key] = (keys[key] ? keys[key] + "," : "") + value;
                return "";
            }

            source.replace(pattern, combiner);

            for (var key in keys) {
                result.push(key + "=" + keys[key]);
            }
            return result.join('&');

        }

        var textData = "foo=1&foo=2&boo=3&foo=4&boo=7&alex=9";
        var compressedFormat  = compress(textData);
        assert(0, "compress this -> foo=1&foo=2&boo=3&foo=4&boo=7&alex=9");
        assert(0, "to this -> foo=1,2,4&boo=3,7&alex=9");
        assert(compressedFormat == "foo=1,2,4&boo=3,7&alex=9", "We compress data!");


    })
    ('second part');

};
