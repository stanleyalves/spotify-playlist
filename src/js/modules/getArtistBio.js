import { ajax, extend } from './utils';
var Promise = require('bluebird');

var GetArtistBio = (artist) => {
	console.log('GetArtistBio promise');
  var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'

	return new Promise(function(resolve, reject) {
		ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        console.log(data)
      }
    });
		return data;
	});
}

export default { GetArtistBio }