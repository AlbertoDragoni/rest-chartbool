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

var datiSecGrafico = {};

var labelsMese = [];
var valoriMese = [];
// console.log(labelsMese);
// console.log(valoriMese);
var nomiVenditori = [];
var fatturatoVenditori = [];

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
                    label: 'Grafico 1',
                    backgroundColor: 'red',
                    borderColor: 'blue',
                    data: valoriMese
                    }]
                }
            });
    }
});
$.ajax({
    url: 'http://157.230.17.132:4007/sales',
    method: 'GET',
    success: function (data) {
        var rispostaDati = data;
        // console.log(rispostaDati);
        for (var i = 0; i < rispostaDati.length; i++) {
            var rispostaVenditore = rispostaDati[i];
            var venditore = rispostaVenditore.salesman;
            var fatturato = rispostaVenditore.amount;
            console.log(venditore);
            // console.log(fatturato);
            if (datiSecGrafico[venditore] === undefined) {
                datiSecGrafico[venditore] = 0;
            }
            datiSecGrafico[venditore] += fatturato;
        }
        for (var key in datiSecGrafico) {
            nomiVenditori.push(key)
            fatturatoVenditori.push(datiSecGrafico[key])
        }
         var ctx = $('#graficoPie');
         var chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: nomiVenditori,
            datasets: [{
                label: 'Grafico 2',
                backgroundColor: ['green', 'blue', 'yellow', 'purple'],
                borderColor: 'white',
                data: fatturatoVenditori
            }]
        },
    });
    }
});
