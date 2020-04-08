$.ajax({
    url: 'http://157.230.17.132:4007/sales',
    method: 'GET',
    success: function (data) {
        var datiProcessati = datiPerGrafico1(data);
        graficoUno(datiProcessati.mesi, datiProcessati.fatturato);

    },
    error: function() {
       alert('errore, riprova!')
   }
});
$.ajax({
    url: 'http://157.230.17.132:4007/sales',
    method: 'GET',
    success: function (data) {
        var datiProcessati = datiPerGrafico2(data);
        graficoDue(datiProcessati.venditori, datiProcessati.valoreVendite);
    },
    error: function() {
       alert('errore, riprova!')
   }
});

function datiPerGrafico1 (data) {
    var rispostaDati = data;
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
    for (var i = 0; i < rispostaDati.length; i++) {
        var risultato = rispostaDati[i];
        var venditeData = risultato.date;
        var dataMese = moment(venditeData, "DD-MM-YYYY").format('MMMM');
        if (venditeMese[dataMese] === undefined) {
            venditeMese[dataMese] = 0;
        }
        venditeMese[dataMese] += risultato.amount;
    }
    var labelsMese = [];
    var valoriMese = [];

    for (var key in venditeMese) {
            labelsMese.push(key);
            valoriMese.push(venditeMese[key]);
    }
    return {
        mesi: labelsMese,
        fatturato: valoriMese
    }
}
function graficoUno (mesi, fatturato){
    var ctx = $('#graficoLine');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
                labels: mesi,
                datasets: [{
                label: 'Grafico 1',
                backgroundColor: 'red',
                borderColor: 'blue',
                data: fatturato
                }]
            }
        });
};
function datiPerGrafico2 (data){
    var rispostaDati = data;
    var datiSecGrafico = {};
    for (var i = 0; i < rispostaDati.length; i++) {
        var rispostaVenditore = rispostaDati[i];
        var venditore = rispostaVenditore.salesman;
        var fatturato = rispostaVenditore.amount;
        console.log(venditore);

        if (datiSecGrafico[venditore] === undefined) {
            datiSecGrafico[venditore] = 0;
        }
        datiSecGrafico[venditore] += fatturato;
    }
    var nomiVenditori = [];
    var fatturatoVenditori = [];
    graficoDue(nomiVenditori, fatturatoVenditori);
    for (var key in datiSecGrafico) {
        nomiVenditori.push(key)
        fatturatoVenditori.push(datiSecGrafico[key])
    }
    return {
       venditori: nomiVenditori,
       valoreVendite: fatturatoVenditori
   }
};
function graficoDue (nomiVenditori, fatturatoVenditori){
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
        }
    });
};
