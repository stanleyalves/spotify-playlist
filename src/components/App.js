var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

//Stores
var SearchStore = require('../stores/searchStore');
var SelectedArtistStore = require('../stores/selectedArtistStore');

//Components
import { Search } from './search';
import { Results } from './results';
import { SelectedArtist } from './selectedArtist';

var App = React.createClass({ 

  mixins: [
    Reflux.connect(SearchStore),
    Reflux.connect(SelectedArtistStore)
  ],

  render(){
    console.log(this.state.selectedArtist);
    console.log(this.state.results)
    return ( 
      <div className = "wrapper">
        <div className="left-bar open">
          <Search/>
          <Results results={this.state.results}/> 
        </div>
        <div className="main">
          <SelectedArtist artist={this.state.selectedArtist}/>
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