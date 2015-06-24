var Reflux = require('reflux');

import {
	searchArtist,
	selectArtist
} from '../modules';

let Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtist': { asyncResult: true },
  'selectArtist': { asyncResult: true },
});

Actions.searchArtist.listenAndPromise(searchArtist);
Actions.selectArtist.listenAndPromise(selectArtist);


// // Actions.getArtistBio.listenAndPromise(GetArtistBio);

// //Do the chain of actions here. 
// Actions.selectArtist.listen(artist => {
// 	SelectArtist(artist).then(Actions.getArtistBio)
// })

export default Actions;