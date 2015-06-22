var Reflux = require('reflux');
import { SelectArtist } from '../modules/selectArtist';
import { GetArtistBio } from '../modules/getArtistBio';

let Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtist': {},
  'updateResult': {},
  'selectArtist': { asyncResult: true },
  'getArtistBio': { asyncResult: true }
});

Actions.selectArtist.listenAndPromise(SelectArtist);
// Actions.getArtistBio.listenAndPromise(GetArtistBio);

//Do the chain of actions here. 
Actions.selectArtist.listen(artist => {
	SelectArtist(artist).then(Actions.getArtistBio)
})

export default Actions;