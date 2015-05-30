var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var Actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var SearchStore = Reflux.createStore({
  listenables: [Actions],

  onSearchArtist(query){
  	var url = 'https://api.spotify.com/v1/search?q='+ query +'&type=artist';
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        console.log(data)
		    Actions.updateResult(data);
      }.bind(this)
    });
  }

});

module.exports = SearchStore;