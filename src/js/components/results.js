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
    var results = this.props.results;
    if (isEmpty(results)) {
      return (
        <div className='results'>
          <ul>
            <li>Please search for an artist</li>
          </ul>
        </div>
      )
    } else {
      var artists = results.artists.items.map(function (data, i){
        var artistImage = GetArtistImage(data),
            artistName = data.name;
        return (
          <li>
            <a onClick={this.selectArtist.bind(data, i)} className="result">
              <div className="artist">
                <img className="artist-pic" src={artistImage}/>
                <p>{artistName}</p>
              </div>
            </a>
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

export default { Results };  