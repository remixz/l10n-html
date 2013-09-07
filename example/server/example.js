var http = require('http');
var url  = require('url');
var l10n = require('../../');

var html  = '<body>';
    html += '<p data-l10n="hello"> Hello, </p>';
    html += '<p data-l10n="nested.world"> World! </p>';
    html += '</body>';
var bundle = {
    fr: {
        hello: 'Bonjour',
        nested: {
            world: 'tout le monde!'
        }
    },
    es: {
        hello: 'Hola,',
        nested: {
            world: 'mundo!'
        }
    }
}

var listener = function (req, res) {
    var route = url.parse(req.url).pathname;
    res.writeHead(200, {'Content-Type': 'text/html'});

    switch (route) {
        case '/':
        default:
            res.end(html);
            break;
        case '/fr':
            res.end(l10n(html, bundle.fr));
            break;
        case '/es':
            res.end(l10n(html, bundle.es));
            break;
    }
}

http.createServer(listener).listen(3000);
console.log('Visit http://localhost:3000,');
console.log('And try the urls /fr and /es.')