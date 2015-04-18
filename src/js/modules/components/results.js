import { ajax, isEmpty, extend } from '../utils';
var Results = React.createClass({
  relatedArtists(selectedArtistData){
    console.log('relatedArtists');
    var url = 'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/related-artists'
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.relatedArtist(data);
      }.bind(this)
    });
  },

  artistBio(selectedArtistData) {
    console.log('artist Bio');
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + selectedArtistData.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        //Combine the 2 objects
        var allData = extend(data, selectedArtistData);
        console.log(allData)
        this.props.chooseArtist(allData);
      }.bind(this)
    });
  },


  chooseArtist(i){
    console.log(this.props.data);
    var artistChosen = this.props.data.data.artists.items[i];
    //Get the wikipedia entry here, for the bio.
    //http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary/18504997#18504997
    //http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary


    //Build the required data in an object
    var selectedArtistData = {
      id : artistChosen.id,
      name : artistChosen.name,
      pic : artistChosen.images[1].url,
      followers : artistChosen.followers.total,
      href : artistChosen.external_urls.spotify
    }
    this.relatedArtists(selectedArtistData);
    this.artistBio(selectedArtistData);

    //Whack that to the parent... 
    // this.props.chooseArtist(selectedArtistData);
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

export default { Results };  