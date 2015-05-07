var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var ResultStore = Reflux.createStore({
  listenables: [actions],

  updateResult(data){
  	alert(data);
  	//Set state in here for results. 
  }

});

module.exports = ResultStore;