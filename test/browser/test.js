var test = require('tape');
var l10n = require('../../');

test('Browser transform test', function (t) {
    normal = document.createElement('p');
    nested = document.createElement('p');
    normal.setAttribute('data-l10n', 'hello');
    nested.setAttribute('data-l10n', 'nested.hello');
    document.body.appendChild(normal);
    document.body.appendChild(nested);

    var translated = l10n(document.querySelector('body'), {
        hello: 'Bonjour',
        nested: {
            hello: 'Hola'
        }
    });

    t.plan(3);
    t.equal(typeof translated, 'object', 'results should be an object');
    t.equal(document.querySelectorAll('p')[0].innerHTML, 'Bonjour', 'non-nested object should have transformed correctly');
    t.equal(document.querySelectorAll('p')[1].innerHTML, 'Hola', 'nested object should have transformed correctly');
    t.end();
});