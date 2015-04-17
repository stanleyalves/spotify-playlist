
import { ajax, isEmpty } from './utils';

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
      selectedArtist: {
        name: "Initial artist", 
        pic : "http://lorempixel.com/output/people-q-c-300-300-8.jpg"
      } 
    };
  },

  handleSearchSubmit(data) {
    console.log('handle search submit');
    this.setState({
      data:data
    })
  },

  selectArtist(artist){
    console.log(artist);
    //heres the magic, set the state of the selected artist.
    //The child components will updated when the state is changed. 
    this.setState({
      selectedArtist: {
        name: artist.name, 
        pic : artist.pic
      }
    });
  },
 
  render(){
    return (
      <div className = "wrapper">
        <div className="left-bar">
          <SearchHeader onSearchSubmit={this.handleSearchSubmit}/>
          <Results data={this.state.data} chooseArtist={this.selectArtist}/>
          <RecentSearches/>
        </div>
        <div className="main">
          <SelectedArtst artist={this.state.selectedArtist}/>
          <SimilarArtst/>
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
        info: "Here is the info"
      }
    }
  },  
  render() {
    return (
      <div className="info-wrapper">
        <div className="selected-artist">
          <h2>{this.props.artist.name}</h2>
          <div className="img-wrapper">
            <img className="artist-pic" src={this.props.artist.pic} alt="Artist name" />
          </div>
          <div className="text-wrapper">
            {this.props.selectedArtist.info}
          </div>
        </div>
      </div>
    )
  }
});

var Results = React.createClass({

  chooseArtist(i){
    console.log(this.props.data);

    //Build the required data in an object

    var selectedArtist = {
      name : this.props.data.data.artists.items[i].name,
      pic : this.props.data.data.artists.items[i].images[1].url
    }

    //Whack that to the parent... 
    this.props.chooseArtist(selectedArtist);
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
        // console.log(data)
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
    React.render(
    <App />, document.body
  );
}