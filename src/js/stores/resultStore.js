var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var ResultStore = Reflux.createStore({
  listenables: [Actions],

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