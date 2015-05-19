var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var SelectedArtistStore = Reflux.createStore({
  listenables: [actions],

  getInitialState() {
    return { 
    	selectedArtist : {}
    };
  },
  //Set state in here for results. 
  onSelectArtist(){
    alert('select artist')
  }

});

module.exports = SelectedArtistStore;