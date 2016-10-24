window.onload = function () {
    (function(chapterName){
        assert('1', chapterName);
        assert('1','.');

        function contert(html){
            var tags = /table|a/i;
            return html.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
               return tags.test(tag) ?  front + '>'+ '</'+tag+'>' : all;
            });
        }

        assert(contert('<a/>') === '<a></a>', 'a tag correct converted');
        assert(contert('<br/>') === '<br/>', 'br tag correct ignored');


        function getNodes(html, doc){
            var map = {"<td": [3,'<table><tbody><tr>','</tr></tbody></table>']};
            var tagName = html.match(/<\w+/), mapEntry = tagName ? map[tagName] : null;

            if(!mapEntry) mapEntry = [0, "", ""];
            var div = (doc || document).createElement('div');

            div.innerHTML = mapEntry[1] + html + mapEntry[2];
            while(mapEntry[0]--) div = div.lastChild;
            return div.childNodes;

        }
        assert(getNodes('<td>test</td><td>test2</td>').length === 2, "using map we get added node");


    })('dom manipulating');
};

