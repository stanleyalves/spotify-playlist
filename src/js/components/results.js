var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { GetArtistImage } from '../modules/mixins';

var Results = React.createClass({
  selectArtist(i){
    var artist = this.props.results.artists.items[i];
    Actions.selectArtist(artist);
  },

  getInitialState() {
    return { 
      results: {}
    };
  },

  render() {
    // var obj = this.props.results;
    //Check to see if the object is empty, if so return an empty <li>

    //   var artists = artistArray.map(function (data, i){
    //     var artistImage = GetArtistImage(data),
    //         artistName = data.name;
    //     return (
    //       <li>
    //         <a onClick={this.selectArtist.bind(data, i)} className="result">
    //           <div className="artist">
    //             <img className="artist-pic" src={artistImage}/>
    //             <p>{artistName}</p>
    //           </div>
    //         </a>
    //       </li>
    //     )
    //   }, this);
    
    return (
      <div className='results'>
        <ul>
          <li>im a stupid cunt</li>
        </ul>
      </div>
    )    
  }
});

export default { Results };  