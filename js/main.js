var venditeMese = {};
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
    }
});

    // var ctx = $('#graficoLine');
    // var chart = new Chart(ctx, {
    //
    // type: 'line',
    //
    // data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //         label: 'My First dataset',
    //         backgroundColor: 'rgb(255, 99, 132)',
    //         borderColor: 'rgb(255, 99, 132)',
    //         data: [0, 10, 5, 2, 20, 30, 45]
    //     }]
    // },
    //
    // // Configuration options go here
    // options: {}
    // });
