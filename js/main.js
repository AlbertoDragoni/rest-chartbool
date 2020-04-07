
var salesmen = [
    {
        id: '',
        saleman: '',
        amount: '',
        date: ''
    }
];

$.ajax({
    url: 'http://157.230.17.132:4007/sales',
    method: 'GET',
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            var risultato = data[i];
            var venditori = {
                id: risultato.id,
                saleman: risultato.salesman,
                amount: risultato.amount,
                date: risultato.date
            };
            salesmen.push(venditori);
        }
    }
});
console.log(salesmen);
