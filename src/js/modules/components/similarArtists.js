import { ajax, isEmpty, extend } from '../utils';
import { Mixins } from '../mixins';

var SimilarArtst = React.createClass({

  mixins: [Mixins],

  similarArtst(i, data) {
    console.log('Related artist click');
    console.log(i);
    console.log(data);
    var url = 'https://api.spotify.com/v1/search?q='+ data.name +'&type=artist';
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.similarArtstClick({data:data});
      }.bind(this)
    });
  },

  render() {
    if (this.props.similarArtists === undefined ) {
      return (
        <div></div>
      )
    } else {
      var artistArray = this.props.similarArtists.artists.slice(0,10);
      var artists = artistArray.map(function (data, i){
        //Change to swicth statement
        if (data.images.length > 3) {
          var imgSrc = data.images[2].url;
        } else if (data.images.length > 1) {
          var imgSrc = data.images[0].url;
        } else {
          'http://placehold.it/45x45'
        };
        return (
          <li>
            <div className="img-wrapper">
              <a onClick={this.similarArtst.bind(this, i, data)} href="#">
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

export default { SimilarArtst };  