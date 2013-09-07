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

var selectn = require('selectn');

module.exports = function (source, bundle) {
    var elems = source.querySelectorAll('[data-l10n]');
    for (var i = 0; i < elems.length; i++) {
        elems[i].innerHTML = selectn(elems[i].getAttribute('data-l10n'), bundle);
    }
    return elems;
};