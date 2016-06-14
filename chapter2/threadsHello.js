window.onload = function () {
    (function (nameOfPart) {
        assert(0, nameOfPart);
        assert(0, '');

        // setTimeout(function again() {
        //     console.log('setTimeout');
        //     setTimeout(again,1000);
        // },1000);
        //
        // setInterval(function () {
        //     console.log('setInterval');
        // },500);

        var body = document.getElementsByTagName('body')[0];
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        body.appendChild(table);
        // var tr = document.createElement('tr');
        // var td = document.createElement('td');
        // td.appendChild(document.createTextNode('some text'));
        //
        // tr.appendChild(td);
        // tbody.appendChild(tr);

        var rowCount = 200000;
        var iteration = 0;
        var devidedInto = 1000;
        var chankSize = rowCount / devidedInto;

        setTimeout(function generateRows() {
            var base = iteration * chankSize;
            for (var i = 0; i < chankSize; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 6; j++) {
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(base+ i + ' : ' + j));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);

            }
            iteration++;
            if (iteration < devidedInto)
                setTimeout(generateRows, 1000);
        }, 0);


    })("Threads in Javascript!");
};
