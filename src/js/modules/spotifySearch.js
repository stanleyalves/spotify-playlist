


var SpotifySearch = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  render : function(){
    return (
      <div className = "wrapper">
        <LeftBar/>
        <Main/>
      </div>
    )
  }
});

var Main = React.createClass({
  render : function() {
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
  render : function() {
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
  render : function() {
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
  render : function() {
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
  render : function() {
    return (
      <div className="left-bar">
        <SearchHeader/>
        <Results/>
        <RecentSearches/>
      </div>
    )
  }
});


var RecentResults = React.createClass({
  render: function() {
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

  render: function() {
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

var Results = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          <div class="artist">
            <h3>Result name</h3>
            <a href="#">View information</a>
          </div>
        </li>
      </ul>
    );
  }
});


var SearchHeader = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    console.log('form submit');
    var query = React.findDOMNode(this.refs.searchBar).value.trim();
    console.log(query)

  },

  render : function() {
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

//This is the React render function which renders your App. 
//It is pasing in the data array into the comment box which will filter down into child
//components
React.render(
  <SpotifySearch />, document.body
);


