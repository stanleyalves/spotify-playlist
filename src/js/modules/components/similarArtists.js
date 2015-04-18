import { ajax, isEmpty, extend } from '../utils';
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

export default { SimilarArtst };  