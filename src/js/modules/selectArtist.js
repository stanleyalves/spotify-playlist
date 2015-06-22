var Actions = require('../actions/actions');
var Promise = require('bluebird')
import { ajax, extend } from './utils';

var SelectArtist = (artist) => {
	return new Promise(function(resolve, reject) {
		var artistData;
		//We need to make a single artist object here, using our extend util.
		var orignalArtist = artist;

		// var bio = Actions.getArtistBio(orignalArtist).then(function(contents) {
  //       var response = JSON.parse(contents.currentTarget.response);
  //       console.log(response.artist.bio.content);
  //       console.log(typeof(response));
  //       //combine the respnse into the original artist
  //   }).catch(function(e) {
  //       alert("Exception " + e);
  //   });

	// console.log(Actions);
	// console.log(Actions.getArtistBio)
	// 	console.log(Actions.default.getArtistBio)

	//    var bio = Actions.getArtistBio(orignalArtist);

    // var artistData = extend({ bio : 'hard coded bio data extended in'}, artist);

    var artistData = extend({ bio : bio}, artist);
		console.log(artistData);

		resolve(artistData);
	});
}

export default { SelectArtist }