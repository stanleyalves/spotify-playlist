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
  onSelectArtist(artist){
    var bio = Actions.getArtistBio(artist);
    // var albums = GetArtistAlbums(artist);
    console.log('AFTER BIO');
    console.log(bio)
    this.trigger({
      selectedArtist : {
        id : artist.id,
        name : artist.name,
        pic : artist.images[1].url,
        followers : artist.followers.total,
        href : artist.external_urls.spotify,
        bio: bio
      }
    });    
  }

});

module.exports = SelectedArtistStore;