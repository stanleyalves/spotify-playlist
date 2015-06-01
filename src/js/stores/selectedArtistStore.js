var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var SelectedArtistStore = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return { 
    	selectedArtist : {}
    };
  },

  //Set state in here for results. 
  onSelectArtistCompleted(artist){
    console.log('on selected artist in store')
    console.log(artist)
    this.trigger({
      selectedArtist : {
        id : artist.id,
        name : artist.name,
        pic : artist.images[1].url,
        followers : artist.followers.total,
        // href : artist.external_urls.spotify,
        bio : artist.bio
      }
    });
  }

});

module.exports = SelectedArtistStore;