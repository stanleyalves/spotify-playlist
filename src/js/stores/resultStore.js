var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var ResultStore = Reflux.createStore({
  listenables: [actions],

  getInitialState() {
    return { 
    	results: {}
    };
  },
  //Set state in here for results. 
  onUpdateResult(data){
  	this.trigger({
  		results: data
  	});
  }

});

module.exports = ResultStore;