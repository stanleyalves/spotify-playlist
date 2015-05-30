var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { GetArtistImage } from '../modules/mixins';

var Results = React.createClass({
  selectArtist(i){
    var artist = this.props.results.artists.items[i];
    actions.selectArtist(artist);
  },

  render() {
    var obj = this.props.results;
    //Check to see if the object is empty, if so return an empty <li>
    if (isEmpty(obj)) {
      return (
        <li></li>
      )
    } else {
      var artistArray = obj.artists.items.slice(0, 10);
      //N.B: http://stackoverflow.com/questions/29549375/react-0-13-class-method-undefined
      // Because your code is in strict mode (modules are always in strict mode),
      // this is undefined inside the function you pass to .map.
      //You either have to explicitly set the context by passing

      var artists = artistArray.map(function (data, i){
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