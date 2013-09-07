var async = require('async');
var test  = require('tape');
var l10n  = require('../../');

async.auto({
    transform_basic: function (callback) {
        var translated = l10n('<p data-l10n="hello">Hello!</p><p data-l10n="nested.everyone">Everyone.</p>', {
            hello: 'Bonjour!',
            nested: {
                everyone: 'Tout le monde.'
            }
        });
        callback(null, translated)
    },

    transform_cheerio: function (callback) {
        var translated = l10n('<p data-l10n="hello">Hello!</p><p data-l10n="nested.everyone">Everyone.</p>', {
            hello: 'Bonjour!',
            nested: {
                everyone: 'Tout le monde.'
            }
        }, {
            returnCheerio: true
        });
        callback(null, translated)
    },

    test: ['transform_basic', 'transform_cheerio', function (callback, obj) {
        test('Basic transform test', function (t) {
            t.plan(2);
            t.equal(typeof obj.transform_basic, 'string', 'should return a string');
            t.equal(obj.transform_basic, '<p>Bonjour!</p><p>Tout le monde.</p>', 'results should be correct');
            t.end();
        });

        test('Cheerio transform test', function (t) {
            t.plan(2);
            t.equal(typeof obj.transform_cheerio, 'function', 'should return a function');
            t.equal(obj.transform_cheerio.html(), '<p>Bonjour!</p><p>Tout le monde.</p>', 'results should be correct');
            t.end();    
        });

        callback();
    }]
}, function(err, obj) {
    test('Catch errors', function(t) {
        t.plan(1);
        t.equal(err, null, 'Errors should be null.');
        t.end();
    });
});