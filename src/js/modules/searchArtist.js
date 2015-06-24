var Actions = require('../actions/actions');
var Promise = require('bluebird')
import { ajax, extend } from './utils';

export default function searchArtist(artist) {
	return new Promise(function(resolve, reject) {
		console.log('inside the search artist module')
		var url = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        console.log(data);
        resolve(data);
      }
    });
	});
}

// var Actions = require('../actions/actions');
// var Promise = require('bluebird')
// import { ajax, extend } from './utils';

// export default function searchArtist(artist) {
//   fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
//   .then(function(response) {
//     console.log(response.json());
//     return response.json()
//   }).then(function(json) {
//     console.log('parsed json', json)
//   }).catch(function(ex) {
//     console.log('parsing failed', ex)
//   })
// }

