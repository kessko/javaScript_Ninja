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
    (function (chapterName) {
        assert(1, '.');
        assert(1, '.');
        assert(1, chapterName);


        var div = document.createElement('dev');
        div.setAttribute('id', 'testId');
        document.body.appendChild(div);

        var count = 500000;
        var start = new Date();
        var end;

        var i = count;
        var result;
        while (i--) {
            result = div.getAttribute('id');
        }
        end = new Date();
        assert(1, 'getAttribute - ' + ( end.getTime() - start.getTime() ) + 'ms');

        start = new Date();
        var i = count;
        while (i--) {
            result = div.id;
        }
        end = new Date();
        assert(1, 'get id use property - ' + ( end.getTime() - start.getTime() ) + 'ms');

        start = new Date();
        i = count;
        while (i--) {
            div.setAttribute('id', 'testId');
        }
        end = new Date();
        assert(1, 'setAttribute - ' + ( end.getTime() - start.getTime() ) + 'ms');

        i = count;
        start = new Date();
        while (i--) {
            div.id = 'testId';
        }
        end = new Date();
        assert(1, 'set id use property - ' + ( end.getTime() - start.getTime() ) + 'ms');


        var form = document.createElement('form');
        form.setAttribute('id', 'testForm');
        form.setAttribute('action', '/');
        var input = document.createElement('input');
        input.id = 'id';
        input.type = 'text';
        var inputAction = document.createElement('input');
        inputAction.type = 'text';
        inputAction.name = 'action';
        form.appendChild(input);
        form.appendChild(inputAction);
        document.body.appendChild(form);

        assert(form.id === 'testForm', 'from property id is correct');
        assert(form.action === '/', 'form property action is correct');
        assert(form.getAttribute('id') === 'testForm', 'from attribute is correct');
        assert(form.getAttribute('action') === '/', 'form attribute action is correct');


        (function () {
            window.attr = function (elem, attr, value) {
                if (elem !== undefined) {
                    var attrExist = elem[attr] != undefined;
                    var isForm = elem.tagName && elem.tagName.toLocaleLowerCase() === 'form';
                    if (value !== undefined) {
                        if (attrExist) {
                            elem[attr] = value;
                        }
                        else {
                            elem.setAttribute(attr, value);
                        }
                    }
                    return isForm ? elem.getAttributeNode(attr) && elem.getAttributeNode(attr).nodeValue :  elem[attr] ? elem[attr] : elem.getAttribute(attr);
                }
                else {
                    throw  "elem in undefined";
                }
            };
        })();

        window.attr(form, 'someValue', 25);

        assert(window.attr(form, 'someValue') === '25', 'custom set attr works');
        assert(window.attr(form,'id') === 'testForm', 'custom function correct returns the property of form tag');

        var link = document.createElement('link');
        link.setAttribute('href', '/home.html');
        var originalHref = link.getAttributeNode('href').nodeValue;
        assert(originalHref === '/home.html', 'original url getting correct with getAttributeNode().nodeValue');
        assert(link.href === originalHref, 'using href property we get incorrect value of src = ' + link.href);
        assert(link.getAttribute('href') === originalHref, 'but we still have correct attribute value using getAttribute method');


    })('manipulating-with-attribute');
};