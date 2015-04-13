(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var SpotifyApp = require('./modules/spotifySearch');
var Utils = require('./modules/utils');

(function () {
	console.log('JS working');
})();

},{"./modules/spotifySearch":2,"./modules/utils":3}],2:[function(require,module,exports){
"use strict";

var SpotifySearch = React.createClass({
  displayName: "SpotifySearch",

  getInitialState: function getInitialState() {
    return { data: [] };
  },

  render: function render() {
    return React.createElement("div", { className: "wrapper" }, React.createElement(LeftBar, null), React.createElement(Main, null));
  }
});

var Main = React.createClass({
  displayName: "Main",

  render: function render() {
    return React.createElement("div", { className: "main" }, React.createElement(SelectedArtst, null), React.createElement(SimilarArtst, null), React.createElement(Player, null));
  }
});

var SelectedArtst = React.createClass({
  displayName: "SelectedArtst",

  render: function render() {
    return React.createElement("div", { className: "info-wrapper" }, React.createElement("div", { className: "selected-artist" }, React.createElement("h2", null, "Artist Name"), React.createElement("div", { className: "img-wrapper" }, React.createElement("img", { className: "artist-pic", src: "http://lorempixel.com/output/people-q-c-300-300-8.jpg", alt: "Artist name" })), React.createElement("div", { className: "text-wrapper" }, React.createElement("p", null, "lorem"))));
  }
});

var SimilarArtst = React.createClass({
  displayName: "SimilarArtst",

  render: function render() {
    return React.createElement("ul", { className: "similar-artists" }, React.createElement("h3", null, "Similar Artists"), React.createElement("li", null, React.createElement("div", { className: "img-wrapper" }, React.createElement("img", { className: "artist-pic", src: "http://lorempixel.com/output/people-q-c-300-300-8.jpg", alt: "Artist name" }))));
  }
});

var Player = React.createClass({
  displayName: "Player",

  render: function render() {
    return React.createElement("div", { className: "player-wrapper" }, React.createElement("div", { className: "player" }, React.createElement("h3", null, "Player Here")), React.createElement("div", { className: "other-tracks" }, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", { href: "#" }, "Track Name here")))));
  }
});

var LeftBar = React.createClass({
  displayName: "LeftBar",

  render: function render() {
    return React.createElement("div", { className: "left-bar" }, React.createElement(SearchHeader, null), React.createElement(Results, null), React.createElement(RecentSearches, null));
  }
});

var RecentResults = React.createClass({
  displayName: "RecentResults",

  render: function render() {
    return React.createElement("div", { className: "recent-searches" }, React.createElement("h3", null, "Recent searches"), React.createElement("ul", null, React.createElement("li", null, React.createElement("img", { className: "artist-pic", src: "http://lorempixel.com/output/people-q-c-300-300-8.jpg" }))));
  }
});

var RecentSearches = React.createClass({
  displayName: "RecentSearches",

  render: function render() {
    return React.createElement("div", { className: "recent-searches" }, React.createElement("h3", null, "recent searches"), React.createElement("ul", null, React.createElement("li", null, React.createElement("img", { className: "artist-pic", src: "http://lorempixel.com/output/people-q-c-300-300-8.jpg" }))));
  }

});

var Results = React.createClass({
  displayName: "Results",

  render: function render() {
    return React.createElement("ul", null, React.createElement("li", null, React.createElement("div", { "class": "artist" }, React.createElement("h3", null, "Result name"), React.createElement("a", { href: "#" }, "View information"))));
  }
});

var SearchHeader = React.createClass({
  displayName: "SearchHeader",

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    console.log("form submit");
    var query = React.findDOMNode(this.refs.searchBar).value.trim();
    console.log(query);
  },

  render: function render() {
    return React.createElement("header", null, React.createElement("h1", null, "Spotify Search"), React.createElement("form", { className: "search-form", onSubmit: this.handleSubmit }, React.createElement("input", { type: "text", placeholder: "search for an artist", ref: "searchBar" }), React.createElement("input", { type: "submit" })));
  }
});

//This is the React render function which renders your App.
//It is pasing in the data array into the comment box which will filter down into child
//components
React.render(React.createElement(SpotifySearch, null), document.body);

},{}],3:[function(require,module,exports){
'use strict';

function extend() {
    var args = [].slice.call(arguments),
        ret = args[0];
    for (var i = 1, len = args.length; i < len; i++) {
        var obj = args[i];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) ret[prop] = obj[prop];
        }
    }
    return ret;
}

function ajax(opts) {
    var args = extend({
        url: undefined,
        dataType: 'text',
        data: '',
        cache: true,
        success: function success(r) {},
        error: function error(r) {},
        method: 'GET',
        async: true
    }, opts);

    if (!args.url) {
        return;
    }if (args.method === 'GET' && !args.cache) args.data += '_=' + new Date().getTime();

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var rs = xhr.readyState;
        if (rs < 4) return;
        if (rs === 4) {
            if (xhr.status !== 200 && xhr.status !== 0) {
                args.error.call(this, xhr.responseText);
                return;
            }
            switch (args.dataType) {
                case 'text':
                case 'html':
                case 'script':
                    args.success.call(this, xhr.responseText);
                    break;
                case 'json':
                    args.success.call(this, JSON.parse(xhr.responseText));
                    break;
                case 'xml':
                    args.success.call(this, xhr.responseXML);
                    break;
            }
        }
    };
    xhr.onerror = function () {
        args.error.call(this, xhr.responseText);
    };
    xhr.open(args.method, args.url, args.async);
    if (args.method === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        args.data = args.data instanceof Object ? JSON.stringify(args.data) : args.data;
    }
    xhr.send(args.data);
}

},{}]},{},[1]);
