var venditeMese = {
    'gennaio': 0,
    'febbraio': 0,
    'marzo': 0,
    'aprile': 0,
    'maggio': 0,
    'giugno': 0,
    'luglio': 0,
    'agosto': 0,
    'settembre': 0,
    'ottobre': 0,
    'novembre': 0,
    'dicembre': 0
};

var labelsMese = [];
var valoriMese = [];
console.log(labelsMese);
console.log(valoriMese);

$.ajax({
    url: 'http://157.230.17.132:4007/sales',
    method: 'GET',
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            var risultato = data[i];
            var venditeData = risultato.date;
            var dataMese = moment(venditeData, "DD-MM-YYYY").format('MMMM');
            if (venditeMese[dataMese] === undefined) {
                venditeMese[dataMese] = 0;
            }
            venditeMese[dataMese] += risultato.amount;
        }
        for (var key in venditeMese) {
                labelsMese.push(key);
                valoriMese.push(venditeMese[key]);
        }
        var ctx = $('#graficoLine');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: labelsMese,
                    datasets: [{
                    label: 'Milestone 1',
                    backgroundColor: 'red',
                    borderColor: 'blue',
                    lineTension: 0,
                    data: valoriMese
                    }]
                }
            });
        // var ctx2 = $('#graficoPie');
        // var myPieChart = new Chart(ctx, {
        //     type: 'pie',
        //     data: {
        //       labels: labelsMese,
        //       datasets: [{
        //           label: 'Milestone 2',
        //           backgroundColor: ['red', 'blue', 'yellow'],
        //           borderColor: 'white',
        //           data: valoriMese
        //       }]
        //   }
        // });
    }
});
