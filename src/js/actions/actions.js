var Reflux = require('reflux');

var Actions = Reflux.createActions({
  'updateAge': {}, 
  'searchArtist': {},
  'updateResult': {},
  'selectArtist': {},
  'getArtistBio': { asyncResult: true }
});

module.exports = Actions;