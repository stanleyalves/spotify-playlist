var Actions = require('../actions/actions');
var Promise = require('bluebird')
import { ajax, extend } from './utils';

export default function selectArtist(artist) {
	return new Promise(function(resolve, reject) {
		var artistData;
		//We need to make a single artist object here, using our extend util.
		var orignalArtist = artist;
    var artistData = extend({ bio : 'hard coded bio data extended in'}, artist);
		console.log(artistData);
		resolve(artistData);
	});
}
