;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        elems[i].innerText = selectn(elems[i].getAttribute('data-l10n'), bundle);
    }
    return elems;

}
},{"selectn":3}],2:[function(require,module,exports){
var l10n = require('../../');

var translated = l10n(document.querySelector('body'), {
    hello: 'Bonjour!'
});
console.log(typeof translated);
},{"../../":1}],3:[function(require,module,exports){

// expose `selectn`

module.exports = selectn;

/**
 * Select n-levels deep into an object given a dot/bracket-notation query.
 * If partially applied, returns a function accepting the second argument.
 *
 * ### Examples:
 *
 *      selectn('name.first', contact);
 *
 *      selectn('addresses[0].street', contact);
 *
 *      contacts.map(selectn('name.first'));
 *
 * @param  {String} query
 * dot/bracket-notation query string
 *
 * @param  {Object} object
 * object to access
 *
 * @return {Function}
 * accessor function that accepts an object to be queried
 */

function selectn(query) {
  var parts;

  // normalize query to `.property` access (i.e. `a.b[0]` becomes `a.b.0`)
  query = query.replace(/\[(\d+)\]/g, '.$1');
  parts = query.split('.');

  /**
   * Accessor function that accepts an object to be queried
   *
   * @private
   *
   * @param  {Object} object
   * object to access
   *
   * @return {Mixed}
   * value at given reference or undefined if it does not exist
   */

  function accessor(object) {
    var ref = object || (1, eval)('this');
    var len = parts.length;
    var idx = 0;

    // iteratively save each segment's reference
    for (; idx < len; idx += 1) {
      if (ref) ref = ref[parts[idx]];
    }

    return ref;
  }

  // curry accessor function allowing partial application
  return arguments.length > 1
       ? accessor(arguments[1]) 
       : accessor;
}


},{}]},{},[2])
;