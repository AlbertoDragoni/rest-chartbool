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
        var datigrafico = {
            labelsMese: [],
            valoriMese: []
        }
        console.log(datigrafico);
        for (var key in venditeMese) {
                datigrafico.labelsMese.push(key);
                datigrafico.valoriMese.push(venditeMese[key]);
            }
            var ctx = $('#graficoLine');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                            labels: datigrafico.labelsMese,
                            datasets: [{
                            label: 'Milestone 1',
                            backgroundColor: 'red',
                            borderColor: 'blue',
                            lineTension: 0,
                            data: datigrafico.valoriMese
                        }]
                    }
                });
    }
});
