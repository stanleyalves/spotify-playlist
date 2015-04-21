import { ajax, isEmpty, extend } from '../utils';
import { Mixins } from '../mixins';

var SimilarArtist = React.createClass({

  mixins: [Mixins],

  selectArtist(i, data){

    var selectedArtistData = this.selectedArtist(data);
    this.similarArtist(selectedArtistData);
    this.artistBio(selectedArtistData);
  },

  render() {
    if (this.props.similarArtistsState === undefined ) {
      return (
        <div></div>
      )
    } else {
      var artistArray = this.props.similarArtistsState.artists.slice(0,10);
      var artists = artistArray.map(function (data, i){
        var imgSrc = this.chooseArtistImage(data);

        return (
          <li>
            <div className="img-wrapper">
              <a onClick={this.selectArtist.bind(this, i, data)} href="#">
                <img className="artist-pic" src={imgSrc} alt="Artist name" />
              </a>
            </div>
          </li>
        )
      }, this);

      return (
        <ul className="similar-artists">
          <h3>Similar Artists:</h3>         
          {artists}
        </ul>
      )
    }
  }
});

export default { SimilarArtist };  