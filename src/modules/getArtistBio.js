var Actions = require('../actions/actions');
var Promise = require('bluebird')
import { ajax, extend } from './utils';

var GetArtistBio = (artist) => {
  return new Promise(function(resolve, reject) {
	   console.log('GetArtistBio promise');

    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'

	// return new Promise(function(resolve, reject) {
	// 	ajax({
 //      url: url,
 //      method:'GET',
 //      dataType: 'json',
 //      success: function(data){
 //        console.log(data)
 //      }
 //    });
	// 	resolve(data);
	// });
  //
    resolve(url);
  });
}

export default { GetArtistBio }