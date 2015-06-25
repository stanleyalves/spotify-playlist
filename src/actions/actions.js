var Reflux = require('reflux');

import {
	searchArtist,
	selectArtist
} from '../modules';

let Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtistApi': { asyncResult: true },
  'selectArtistApi': { asyncResult: true },
});

Actions.searchArtistApi.listenAndPromise(searchArtist);
Actions.selectArtistApi.listenAndPromise(selectArtist);


// // Actions.getArtistBio.listenAndPromise(GetArtistBio);

// //Do the chain of actions here. 
// Actions.selectArtist.listen(artist => {
// 	SelectArtist(artist).then(Actions.getArtistBio)
// })

export default Actions;