var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
var store = require('../stores/store');

//Stores
var SearchStore = require('../stores/searchStore');
var ResultStore = require('../stores/resultStore');

//Components
import { Search } from './search';
import { Results } from './results';

var App = React.createClass({ 

  mixins: [
    Reflux.connect(store),
    Reflux.connect(SearchStore),
    Reflux.connect(ResultStore)
  ],

  render(){
    var p = this.state.person;
    return ( 
      <div className = "wrapper">
        <div className="left-bar open">
          <Search/>
          <Results results={this.state.results}/> 
          <h2 onClick={actions.updateAge}>{p.age}</h2>         
        </div>       
      </div>
    )
  }
});

export function start() {
  React.render(
    <App />, document.body
  );
}