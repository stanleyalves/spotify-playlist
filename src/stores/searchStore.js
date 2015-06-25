var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var Actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var SearchStore = Reflux.createStore({
  
  listenables: [Actions],

  init() {
    console.log('search artist store init');
  },

  getInitialState() {
    return { 
      results: {},
      selectedArtist : {}
    };
  },

  onSearchArtistCompleted(data){
    this.trigger({
      results: data
    });
  }

});

module.exports = SearchStore;