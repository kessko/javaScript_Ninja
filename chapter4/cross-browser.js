window.onload = function () {
    (function (chapterName) {
        assert(1, chapterName);
        assert(1, '.');
        assert(1, '.');
        assert(1, '.');

        Object.prototype.isMan = true;
        var ninja = {name: 'Segun'};
        ninja.samurai = true;

        assert(ninja.hasOwnProperty('isMan'), 'isMan is own property of ninja');
        assert(ninja.hasOwnProperty('name'), 'ninja have own property - name');
        assert(ninja.hasOwnProperty('samurai'), 'ninja have own property - samurai');


        document.body.appendChild(document.createComment('test comment 1'));
        document.body.appendChild(document.createComment('test comment 2'));


        var allElements = function () {
            if (!window.findAllElementsWorksAsExpected) {
                window.findAllElementsWorksAsExpected = (function () {
                    var div = document.createElement('div');
                    div.appendChild(document.createComment('test'));

                    return div.getElementsByTagName('*').length === 0;
                })();
            }
            var allElements = document.getElementsByTagName('*');
            if (!window.findAllElementsWorksAsExpected) {
                if (!findAllElementsWorksAsExpected()) {
                    var i = allElements.length;
                    while (i--) {
                        if (allElements[i].nodeType !== 1) {
                            allElements.splice(i, 1);
                        }
                    }
                }
            }
            return allElements;
        };


        var elements = allElements();
        var i = elements.length;
        while (i--) {
            assert(elements[i].nodeType === 1, 'Its a Node )');
        }

        var defaultOld = 26;

        function calculateNinjaOld(ninja) {
            if (ninja.old === null || ninja.old === undefined) {
                ninja.old = defaultOld;
            }
        }

        calculateNinjaOld(ninja);
        assert(ninja.old == 26, 'expect that ninja is 26 ears old');


    })("cross-browser-part");
};