var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions');
var ActionsAsync = require('../actions/actions');

import { GetArtistBioAction } from '../actions/actions'
import { GetArtistBio, GetArtistAlbums } from '../modules/mixins';
import { ajax } from '../modules/utils';

var SelectedArtistStore = Reflux.createStore({
  listenables: [actions, ActionsAsync],

  getInitialState() {
    return { 
    	selectedArtist : {}
    };
  },

  onGetArtistBio(){
    alert('getting the bio')
  },

  onStatusAdded: function () {
    alert('async')
    // doSomethingAsync()
    // .then(Actions.statusAdded.completed)
    // .catch(Actions.statusAdded.failed)
  },

  //Set state in here for results. 
  onSelectArtist(artist){
    var bio = ActionsAsync.statusAdded();
    // var albums = GetArtistAlbums(artist);

    // this.trigger({
    //   selectedArtist : {
    //     id : artist.id,
    //     name : artist.name,
    //     pic : artist.images[1].url,
    //     followers : artist.followers.total,
    //     href : artist.external_urls.spotify,
    //     bio: bio
    //   }
    // });    
  }

});

module.exports = SelectedArtistStore;