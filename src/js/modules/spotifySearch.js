
import { ajax } from './utils';

// let arr = [1, 2, 3, 4];

// let [first, ...rest] = arr;

// console.log(first, rest);

// let select = (sel, context = document) => [...context.querySelectorAll(sel)];

// select('div').forEach((el) => (el.innerText = 'shit'));

// var obj = {
//   a: '1',
//   b: '2',
//   c: '3'
// };

// let { a, b } = obj;

// let mutated = arr.map((x) => x * x);

var SpotifySearch = React.createClass({

  getInitialState() {
    return {data: []};
  },

  render(){
    return (
      <div className = "wrapper">
        <LeftBar/>
        <Main/>
      </div>
    )
  }
});

var Main = React.createClass({
  render() {
    return (
      <div className="main">
        <SelectedArtst/>
        <SimilarArtst/>
        <Player/>
      </div>
    )
  }
});

var SelectedArtst = React.createClass({
  render() {
    return (
      <div className="info-wrapper">
        <div className="selected-artist">
          <h2>Artist Name</h2>
          <div className="img-wrapper">
            <img className="artist-pic" src="http://lorempixel.com/output/people-q-c-300-300-8.jpg" alt="Artist name" />
          </div>
          <div className="text-wrapper">
            <p>lorem</p>
          </div>
        </div>
      </div>
    )
  }
});

var SimilarArtst = React.createClass({
  render() {
    return (
      <ul className="similar-artists">
        <h3>Similar Artists</h3>
        <li>
          <div className="img-wrapper">
            <img className="artist-pic" src="http://lorempixel.com/output/people-q-c-300-300-8.jpg" alt="Artist name" />
          </div>
        </li>
      </ul>
    )
  }
});

var Player = React.createClass({
  render() {
    return (
      <div className="player-wrapper">
        <div className="player">
          <h3>Player Here</h3>
        </div>
        <div className="other-tracks">
          <ul>
            <li><a href="#">Track Name here</a></li>
          </ul>
        </div>
      </div>
    )
  }
});

var LeftBar = React.createClass({
  getInitialState() {
    return {data: []};
  },

  handleSearchSubmit(data) {
    console.log('handle search submit');
    this.setState({data:data})
  },

  render() {
    return (
      <div className="left-bar">
        <SearchHeader onSearchSubmit={this.handleSearchSubmit}/>
        <Results data={this.state.data}/>
        <RecentSearches/>
      </div>
    )
  }
});

var Results = React.createClass({
  getInitialState() {
    return {data: []};
  },
  render() {
    console.log(this.props.data);

    var searchResults = this.props.data.map(function (data){
      return (
        <li>
          <div className="artist">
            <h3>{data.name}</h3>
            <a href="#">View information</a>
          </div>
        </li>
      )
    }); 

    return (
      <ul>
        {searchResults}
      </ul>
    ) 
    
  }
});


var SearchHeader = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var query = encodeURI(React.findDOMNode(this.refs.searchBar).value.trim());
    var url = 'https://api.spotify.com/v1/search?q='+ query +'&type=artist';

    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.onSearchSubmit({data:data})
        console.log(data)
      }.bind(this)
    });
  },

  render() {
    return (
      <header>
        <h1>Spotify Search</h1>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="search for an artist" ref="searchBar" />
          <input type="submit" />
        </form>
      </header>
    )
  }
});



var RecentResults = React.createClass({
  render() {
    return (
      <div className="recent-searches" >
        <h3>Recent searches</h3>
        <ul>
          <li>
            <img className="artist-pic"  src="http://lorempixel.com/output/people-q-c-300-300-8.jpg"/>
          </li>
        </ul>
      </div>
    );
  }
});

var RecentSearches = React.createClass({
  render() {
    return (
      <div className="recent-searches">
        <h3>recent searches</h3>
        <ul>
          <li>
            <img className="artist-pic"  src="http://lorempixel.com/output/people-q-c-300-300-8.jpg"/>
          </li>
        </ul>
      </div>
    );
  }
});

//This is the React render function which renders your App. 
//It is pasing in the data array into the comment box which will filter down into child
//components
export function start() {
  console.log('start');
  React.render(
    <SpotifySearch />, document.body
  );
}