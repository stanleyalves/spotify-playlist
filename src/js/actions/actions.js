var Reflux = require('reflux');

var actions = Reflux.createActions([
  'updateAge', 
  'searchArtist',
  'updateResult',
  'selectArtist',
  'getArtistBio'

]);

module.exports = actions;