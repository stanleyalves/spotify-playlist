var Reflux = require('reflux');
import { GetArtistBio, GetArtistAlbums } from '../modules/mixins';

var actions = Reflux.createActions([
  'updateAge', 
  'searchArtist',
  'updateResult',
  'selectArtist'
]);

var ActionsAsync = Reflux.createActions({
  'statusAdded': { asyncResult: true }
});

module.exports = actions, ActionsAsync;