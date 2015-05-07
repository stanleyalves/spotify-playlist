var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
var store = require('../stores/store');
var storeSearchHeader = require('../stores/storeSearchHeader');

//Import the components
import { Search } from './searchHeader';
import { Results } from './results';

var App = React.createClass({ 

  mixins: [Reflux.connect(store)],

  render(){
    var p = this.state.person;
    return ( 
      <div className = "wrapper">
        <div className="left-bar open">
          <Search/>
          <Results/> 
          <h1>Howdy</h1>
          <h2>{p.name}</h2>
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