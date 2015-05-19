var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { Mixins } from '../modules/mixins';

var SelectedArtst = React.createClass({
  mixins: [Mixins],

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
      var albumArray = this.props.albums.albums;
      console.log(albumArray)

      var albums = albumArray.map(function (data, i){
        return (
          <li>
            <a className="result">
              <div className="artist">
                <img className="artist-pic" src= "http://placehold.it/45x45"/>
              </div>
            </a>
          </li>
        )
      }, this);
      return (
        <div className="info-wrapper">
          <div className="selected-artist">
            <div className="img-wrapper">
              <a target="_blank" href={this.props.artist.href}>
                <img className="artist-pic" src={this.props.artist.pic} alt="Artist name" />
              </a>
            </div>
            <div className = "current-selection">
              <h3>{this.props.artist.name}</h3>
              <div dangerouslySetInnerHTML={{__html: this.props.artist.bio}} className="text-wrapper">
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

export default { SelectedArtst };  