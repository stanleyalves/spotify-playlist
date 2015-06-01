var Reflux = require('reflux');
import { SelectArtist } from '../modules/selectArtist';
import { GetArtistBio } from '../modules/GetArtistBio';

let Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtist': {},
  'updateResult': {},
  'selectArtist': { asyncResult: true },
  'getArtistBio': { asyncResult: true }
});

Actions.selectArtist.listenAndPromise(SelectArtist);
Actions.getArtistBio.listenAndPromise(GetArtistBio);

export default Actions;