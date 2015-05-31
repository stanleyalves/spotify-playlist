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

  onGetArtistBio(artist) {
    console.log('ON get artist BIO')
    console.log(artist)
    // alert('on get artist bio');
    
  },

  //Set state in here for results. 
  onSelectArtist(artist){
    var bio = Actions.getArtistBio(artist).load(
      console.log(resolve)
    );
    // var albums = GetArtistAlbums(artist);
    console.log('AFTER BIO');
    console.log(bio); //Returns the promise


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