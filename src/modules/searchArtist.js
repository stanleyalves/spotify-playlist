var Actions = require('../actions/actions');
import status from './status';
import json from './json';
// import { ajax, extend } from './utils';

export default function searchArtist(artist) {
  fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('request succeeded with JSON response', data);
    return(data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
}
