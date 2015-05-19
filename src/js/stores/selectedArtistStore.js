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
  onSelectArtist(artist){
    this.trigger({
      selectedArtist : {
        id : artist.id,
        name : artist.name,
        pic : artist.images[1].url,
        followers : artist.followers.total,
        href : artist.external_urls.spotify
      }
    });    
  }, 

  onGetArtistBio(artist) {
    console.log('ON Artist BIO')
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.trigger({
          selectedArtist : {
            bio : data.artist.bio.summary
          }
        })
      }.bind(this)
    });    
  }

});

module.exports = SelectedArtistStore;