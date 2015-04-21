import { ajax, isEmpty, extend } from '../utils';
import { Mixins } from '../mixins';

var Results = React.createClass({

  mixins: [Mixins],

  selectArtist(i){
    var artistChosen = this.props.data.data.artists.items[i];
    
    //Build the required data in an object
    var selectedArtistData = this.selectedArtist(artistChosen);
    this.similarArtist(selectedArtistData);
    this.artistBio(selectedArtistData);
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
      console.log('Results Data:')
      console.log(obj)
      //N.B: http://stackoverflow.com/questions/29549375/react-0-13-class-method-undefined
      // Because your code is in strict mode (modules are always in strict mode),
      // this is undefined inside the function you pass to .map.
      //You either have to explicitly set the context by passing

      var artists = artistArray.map(function (data, i){
        var imgSrc = this.chooseArtistImage(data);
        return (
          <li>
            <a className="result" key={data.id} onClick={this.selectArtist.bind(this, i)}>
              <div className="artist">
                <img className="artist-pic" src={imgSrc}/>
                <p>{data.name}</p>
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