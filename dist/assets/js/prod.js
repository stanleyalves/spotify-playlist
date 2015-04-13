(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Test = require('./modules/commentBox');

(function () {
	console.log('JS working');
})();

},{"./modules/commentBox":2}],2:[function(require,module,exports){
"use strict";

var SpotifySearch = React.createClass({
  displayName: "SpotifySearch",

  render: function render() {
    return React.createElement("div", { className: "spotifyWrapper" }, React.createElement("h1", null, "Spotify Searcher"));
  }
});

//This is the React render function which renders your App.
//It is pasing in the data array into the comment box which will filter down into child
//components
React.render(React.createElement(SpotifySearch, null), document.body);

},{}]},{},[1]);
