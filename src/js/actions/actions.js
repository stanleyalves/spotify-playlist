var Reflux = require('reflux');

var actions = Reflux.createActions([
  'updateAge', 
  'searchArtist',
  'updateResult'
]);

module.exports = actions;