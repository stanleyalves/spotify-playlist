var Actions = require('../actions/actions');
var Promise = require('bluebird')

import status from './status';
import json from './json';


export default function searchArtist(artist) {
  return new Promise(function(resolve, reject) {
    fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('request succeeded with JSON response', data);
      resolve(data)
    }).catch(function(error) {
      console.log('request failed', error)
    })
  });
}
