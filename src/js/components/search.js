var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

import { ajax } from '../modules/utils';

var Search = React.createClass({
  handleSubmit(e) {
    e.preventDefault();    
    var query = encodeURI(React.findDOMNode(this.refs.searchBar).value.trim());
    //Do the action;
    Actions.searchArtist(query);  
  },

  render() {
    return (
      <header>
        <img className="logo" src ="/assets/img/spotify-logo.svg"/>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text"  defaultValue="queen" placeholder="search for an artist" ref="searchBar" />
          <input value="Go" className="btn btn-default" name="submit" type="submit" />
        </form>
      </header>
    )
  }
});

export default { Search };  