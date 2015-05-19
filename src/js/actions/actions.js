var Reflux = require('reflux');

var actions = Reflux.createActions([
  'updateAge', 
  'searchArtist',
  'updateResult',
  'selectArtist'
]);

module.exports = actions;