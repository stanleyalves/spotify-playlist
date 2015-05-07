var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');

var store = Reflux.createStore({
  listenables: [actions],

  onUpdateAge(){
    person.age = Math.random() * 100;
    this.trigger({person});
  },

  getInitialState(){
    return {person}
  }

});

module.exports = store;