var Reflux = require('reflux');
import { GetArtistBio } from '../modules/mixins';

let Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtist': {},
  'updateResult': {},
  'selectArtist': {},
  'getArtistBio': { asyncResult: true }
});

Actions.getArtistBio.listenAndPromise(GetArtistBio);

export default Actions;