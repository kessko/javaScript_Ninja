window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');
        function trim(str) {
            return (str || "").replace(/^\s+|\s+$/g, "");
        }

        assert(trim(" #id div.class ") == "#id div.class", "Use our trim without loop");

        function alternateTrim(str) {
            return str.replace(/^\s\s*/, '')
                .replace(/\s\s*$/, '');
        }

        assert(alternateTrim(" #id div.class ") == "#id div.class", "use alternative approach");
        function trimForLongDocument(str) {
            str = str.replace(/^\s\s*/, '');
            var pattern = /\s/;
            var i = str.length;
            while (pattern.test(str.charAt(--i)));
            return str.slice(0, i + 1);
        }

        assert(trimForLongDocument(" #id div.class ") == "#id div.class", "use trim for long documents");

        var html= "<b>Hello</b>\n<i>world!</i>";
        assert(/.*/.exec(html)[0] === "<b>Hello</b>", "A normal capture doesn't handle endlines");
        assert(/[\s\S]*/.exec(html)[0] === "<b>Hello</b>\n<i>world!</i>", "matching everything with a character set.");
        assert(/(?:\s|.)*/.exec(html)[0] === "<b>Hello</b>\n<i>world!</i>", "using a non-capturing group to match everything");

        var text ="\u5FCD\u8005\u30D1\u30EF\u30FC";
        var matchAll = /[\w\u0080-\uFFFF_-]+/;

        assert(text.match(matchAll), 'Our regexp match unicode!');

         var pattern = /^((\w+)|(\\.))+$/;
        var test  =[
            'formUpdate',
            'form\\.update\\.whatever',
            'form\\:update',
            '\\f\\o\\p\\s',
            'form:update'
        ];

        for(var i =0 ; i < test.length ; i++){
            assert(pattern.test(test[i]), test[i] + ' is matched');
        }
        



    })("Typical RegExp Tasks");
}
