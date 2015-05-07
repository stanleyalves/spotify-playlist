var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax } from '../modules/utils';

var storeSearchHeader = Reflux.createStore({
  listenables: [actions],

  searchArtist(query){
  	var url = 'https://api.spotify.com/v1/search?q='+ query +'&type=artist';
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
		    console.log(data)
      }.bind(this)
    });
  }

});

module.exports = storeSearchHeader;