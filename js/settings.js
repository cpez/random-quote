/* Detect browser can use web storage */
if (!typeof(Storage) !== 'undefined') {
    $('#yay').fadeIn('slow');
} else {
    $('#ooh').fadeIn('slow');
}

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}

var quotes = uniq_fast(JSON.parse(localStorage.getItem('quote')) || []).filter(Boolean);

$('#val').text(quotes.join(', '));

$('#set').click(function() {
    var quote = $('#text').val();
    quotes[quotes.length] = quote;
    localStorage.setItem('quote', JSON.stringify(quotes));
});

$('#get').click(function() {
    $('#val').text(quotes.join(', '));
});

$('#remove').click(function() {
    localStorage.removeItem('quote');
    $('#val').text(quotes.join(', '));
});

function getRandomQuote() {
    $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies",
        type: "Post",
        data: {},
        datatype: 'json',
        success: function(data) {
            var newQuote = JSON.parse(data).quote;
            quotes[quotes.length] = newQuote;
            localStorage.setItem('quote', JSON.stringify(quotes));
            $('#val').text(quotes.join(', '));
        },
        error: function(err) {
            console.log(err);
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "VeyXpOktQ4msh7cDFWQegB1gND0np1YHmmojsn0xKuqBTg6DAb");
        }
    });
}

$('#random').click(function() {
    getRandomQuote();
});