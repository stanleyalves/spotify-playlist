var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var SelectedArtistStore = Reflux.createStore({
  listenables: [Actions],

  init: function() {
      this.listenTo(Actions.getArtistBio, 'onGetArtistBio');
  },

  getInitialState() {
    return { 
    	selectedArtist : {}
    };
  },

  onGetArtistBio(promise) {
    console.log('ON GET ARTIST BIO');
    console.log(promise)
    console.log('ONGETARTISTBIO XHR')
    console.log(xhr)
    this.setState({
      selectedArtist: {
        bio : response.artist.bio.content
      }
    });
  },

  //Set state in here for results. 
  onSelectArtist(artist){

    var self = this;

    var bio = Actions.getArtistBio(artist).then(function(contents) {
        var response = JSON.parse(contents.currentTarget.response);
        console.log(response.artist.bio.content);
        console.log(typeof(response));

        self.trigger({
          selectedArtist : {
            id : artist.id,
            name : artist.name,
            pic : artist.images[1].url,
            followers : artist.followers.total,
            href : artist.external_urls.spotify,
            bio: response.artist.bio.content
          }
        });


    }).catch(function(e) {
        alert("Exception " + e);
    });
    // var albums = GetArtistAlbums(artist);
    // Actions.getArtistBio(artist);

    // this.trigger({
    //   selectedArtist : {
    //     id : artist.id,
    //     name : artist.name,
    //     pic : artist.images[1].url,
    //     followers : artist.followers.total,
    //     href : artist.external_urls.spotify
    //   }
    // });    
  }

});

module.exports = SelectedArtistStore;