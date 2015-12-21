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

};
