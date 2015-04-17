
import { ajax, isEmpty, extend } from './utils';

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

var App = React.createClass({

  getInitialState() {
    return {
      data: {},
      selectedArtist : undefined, 
      similarArtists : undefined,
      secentSearches : undefined
    };
  },

  handleSearchSubmit(data) {
    console.log('handle search submit');
    this.setState({
      data:data
    })
  },

  relatedArtists(data) {
    this.setState({
        similarArtists: {
          artists : data.artists
        }
      }
    )
  },

  selectArtist(data){
    console.log('select AETISTSTSTS')
    console.log(data);
    //heres the magic, set the state of the selected artist.
    //The child components will updated when the state is changed. 
    this.setState({
      selectedArtist: {
        name: data.name, 
        pic : data.pic,
        followers : data.followers,
        href : data.href,
        bio : data.artist.bio.summary
      }
    });
  },
 
  render(){
    return (
      <div className = "wrapper">
        <div className="left-bar">
          <SearchHeader onSearchSubmit={this.handleSearchSubmit}/>
          <Results data={this.state.data} chooseArtist={this.selectArtist} relatedArtist={this.relatedArtists} />
          <RecentSearches/>
        </div>
        <div className="main">
          <SelectedArtst artist={this.state.selectedArtist}/>
          <SimilarArtst similarArtists={this.state.similarArtists}/>
          <Player/>
        </div>
      </div>
    )
  }
});

var SelectedArtst = React.createClass({
  //Note getDefaultProps get overwritten on render.
  //This is why the name gets overwritten, but the info doesnt
  //The name is getting overwitten by the set props, which are initially done in the state.
  getDefaultProps() {
    return {
      selectedArtist : {
        name: "Default Props",
        info: "Here is the default props info"
      }
    }
  },
  render() {
    if (this.props.artist === undefined ) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="info-wrapper">
          <div className="selected-artist">
            <h2>{this.props.artist.name}</h2>
            <div className="img-wrapper">
              <a target="_blank" href={this.props.artist.href}>
                <img className="artist-pic" src={this.props.artist.pic} alt="Artist name" />
              </a>
              <p>Followers: {this.props.artist.followers}</p>
            </div>
            <div className="text-wrapper">
              {this.props.artist.bio}
            </div>
          </div>
        </div>
      )
    }
  }
});

var Results = React.createClass({

  relatedArtists(selectedArtistData){
    console.log('relatedArtists');
    var url = 'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/related-artists'
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        // this.props.chooseArtist(selectedArtistData);
        //Combine the 2 objects
        this.props.relatedArtist(data);
      }.bind(this)
    });
  },

  artistBio(selectedArtistData) {
    console.log('artist Bio');
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + selectedArtistData.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        // this.props.chooseArtist(selectedArtistData);
        //Combine the 2 objects
        var allData = extend(data, selectedArtistData);
        console.log(allData)
        this.props.chooseArtist(allData);
      }.bind(this)
    });
  },


  chooseArtist(i){
    console.log(this.props.data);
    var artistChosen = this.props.data.data.artists.items[i];
    //Get the wikipedia entry here, for the bio.
    //http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary/18504997#18504997
    //http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary


    //Build the required data in an object
    var selectedArtistData = {
      id : artistChosen.id,
      name : artistChosen.name,
      pic : artistChosen.images[1].url,
      followers : artistChosen.followers.total,
      href : artistChosen.external_urls.spotify
    }
    this.relatedArtists(selectedArtistData);
    this.artistBio(selectedArtistData);

    //Whack that to the parent... 
    // this.props.chooseArtist(selectedArtistData);
  },

  render() {
    var obj = this.props.data;
    //Check to see if the object is empty, if so return an empty <li>
    if (isEmpty(obj)) {
      return (
        <li></li>
      )
    } else {
      var artistArray = this.props.data.data.artists.items.slice(0, 10);
      //N.B: http://stackoverflow.com/questions/29549375/react-0-13-class-method-undefined
      // Because your code is in strict mode (modules are always in strict mode),
      // this is undefined inside the function you pass to .map.
      //You either have to explicitly set the context by passing 
      var artists = artistArray.map(function (data, i){
        return (
          <li>
            <div className="artist">
              <img className="artist-pic" src={data.images.length > 1 ? data.images[0].url : 'http://placehold.it/150x150'}/>
              <p>{data.name}</p>
              <a key={data.id} onClick={this.chooseArtist.bind(this, i)}>View more info</a>
            </div>
          </li>
        )
      }, this);

      return (
        <div className='results'>
          <ul>
            {artists}
          </ul>
        </div>
      )
    }        
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
      }.bind(this)
    });
  },

  render() {
    return (
      <header>
        <h1>Spotify Search</h1>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text"  placeholder="search for an artist" ref="searchBar" />
          <input type="submit" />
        </form>
      </header>
    )
  }
});

var SimilarArtst = React.createClass({
  render() {
    if (this.props.similarArtists === undefined ) {
      return (
        <div></div>
      )
    } else {
      var artistArray = this.props.similarArtists.artists;
      var artists = artistArray.map(function (data, i){
        return (
          <li>
            <div className="img-wrapper">
              <img className="artist-pic" src={data.images.length > 1 ? data.images[0].url : 'http://placehold.it/150x150'} alt="Artist name" />
            </div>
          </li>
        )
      }, this);

      return (
        <ul className="similar-artists">
          <h3>Similar Artists :</h3>         
          {artists}
        </ul>
      )
    }
    
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
export function start() {
    React.render(
    <App />, document.body
  );
}