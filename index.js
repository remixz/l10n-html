/**
 * l10n-html - A nicer solution to localization.
 *
 * Copyright (c) 2013 Zach Bruggeman
 *
 * l10n-html is licensed under the MIT License.
 *
 * @package l10n-html
 * @author Zach Bruggeman <talkto@zachbruggeman.me>
 */

var _       = require('lodash');
var cheerio = require('cheerio');
var selectn = require('selectn');

module.exports = function (source, bundle, opts) {
    if (opts === undefined) opts = {};
    _.defaults(opts, {
        returnCheerio: false,
        stripDataAttributes: true
    });

    if (typeof source === 'string') {
        var $ = cheerio.load(source);
    } else {
        var $ = source;
    }

    $('*[data-l10n]').each(function (i, el) {
        var key = $(this).attr('data-l10n');
        $(this).html(selectn(key, bundle));
        if (opts.stripDataAttributes) $(this).removeAttr('data-l10n');
    });

    if (opts.returnCheerio) {
        return $;
    } else {
        return $.html();
    }
};