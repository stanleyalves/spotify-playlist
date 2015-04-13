


var SpotifySearch = React.createClass({
  render : function(){
    return (
      <div className = "spotifyWrapper">
        <h1>Spotify Searcher</h1>
      </div>
    )
  }
});

//This is the React render function which renders your App. 
//It is pasing in the data array into the comment box which will filter down into child
//components
React.render(
  <SpotifySearch />, document.body
);


