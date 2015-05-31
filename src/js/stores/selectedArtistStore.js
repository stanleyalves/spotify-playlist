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

  init() {
    this.listenTo(Actions.getArtistBio, this.onGetArtistBio);
  },

  //Set state in here for results. 
  onSelectArtist(artist){
    var bio = Actions.getArtistBio(artist).then(function(contents) {
        var response = JSON.parse(contents.currentTarget.response);
        console.log(response.artist.bio.content);
        console.log(typeof(response));

    }).catch(function(e) {
        alert("Exception " + e);
    });
    // var albums = GetArtistAlbums(artist);

    this.trigger({
      selectedArtist : {
        id : artist.id,
        name : artist.name,
        pic : artist.images[1].url,
        followers : artist.followers.total,
        href : artist.external_urls.spotify
      }
    });    
  }

});

module.exports = SelectedArtistStore;