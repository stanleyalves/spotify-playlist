var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { Mixins } from '../modules/mixins';

var SelectedArtist = React.createClass({
  mixins: [Mixins],

  render() {
    var artist = this.props.artist;

    if (isEmpty(artist)) {
      return (
        <div></div>
      )
    } else {
      console.log('SLECTED ARTIST')
      console.log(artist)
      return (
        <div className="info-wrapper">
          <div className="selected-artist">
            <div className="img-wrapper">
              <a target="_blank" href={artist.href}>
                <img className="artist-pic" src={artist.pic} alt="Artist name" />
              </a>
            </div>
            <div className = "current-selection">
              <h3>{artist.name}</h3>
              <div dangerouslySetInnerHTML={{__html: artist.bio}} className="text-wrapper">
              </div>
              <div className="artist-albums">
              <h3>Artist Albums:</h3>
                {this.props.albums}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});

export default { SelectedArtist };  