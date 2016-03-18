
// Setting the colours for the background
var uiGradientsUrl = 'https://cdn.rawgit.com/Ghosh/uiGradients/master/gradients.json';

var html = $('html'),
    helper = $('.helper'),
    title = $('.title'),
    gradientsList,
    activeGradient,
    i = 0;

$.getJSON(uiGradientsUrl, function(data) {
    gradientsList = data;
    // Shuffle Array
    gradientsList.sort(function() {
        return 0.5 - Math.random();
    });
});

var bgChangeInterval = function() {
    // Get gradient
    activeGradient = gradientsList[Math.floor(Math.random() * gradientsList.length)];

    // Flip target for transition
    var target = html;
    helper.removeClass('active');

    if (i % 2 === 0) {
        target = helper;
        html.removeClass('active');
    }

    // Set new gradient
    target.css({
        'background': activeGradient.colors[0],
        'background': 'linear-gradient(to left, ' + activeGradient.colors[0] + ' ,' + activeGradient.colors[1] + ')'
    }).addClass('active');
};

window.onload = function() {
    setTimeout(bgChangeInterval, 200)
}


// Load a random quote
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
var quote = quotes[Math.floor(Math.random() * quotes.length)];

if (quote.length === 0) {
    quote = 'Nothing to see here. Go set the quotes.';
}

$('#val').text(quote);

// Type out the quotes
function typeIt() {
    $('.teletype').each(function(index) {
        var c = $(this).html().split("");
        $(this).html('');
        teletype(c, $(this));
    });

    function teletype(c, t) {
        var i = 0;
        setInterval(function() {
            if (i < c.length) {
                t.append(c[i]);
                i++;
            }
        }, 70);
    };
};

typeIt();