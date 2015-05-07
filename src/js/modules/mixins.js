import { ajax, isEmpty, extend } from './utils';

var Mixins = {

	testMixin() {
		alert('test test');
	},

	similarArtist(selectedArtistData){
    var url = 'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/related-artists';
    console.log(url)
    console.log('similarArtist AJAX')
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.similarArtists(data);
      }.bind(this)
    });
  },

  artistAlbum(selectedArtistData) {
    var url =  'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/albums';
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.artistAlbums(data);
        console.log('ARTIST ALBUMS')
        console.log(data)
      }.bind(this)
    });
  },

	artistBio(selectedArtistData) {
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + selectedArtistData.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'
    console.log('ksjsjsjkasnjadskcbk')
    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        //Combine the 2 objects
        var allData = extend(data, selectedArtistData);
        console.log('ALL DATA')
        console.log(allData)
        this.props.chooseArtist(allData);
      }.bind(this)
    });
  },

  //Choose the artist image, if none available, use placeholder.
  chooseArtistImage(data) {
    console.log(data)
  	var imgSrc;
  	if (data.images.length > 3) {
      imgSrc = data.images[2].url;
    } else if (data.images.length > 1) {
      imgSrc = data.images[0].url;
    } else {
      imgSrc = 'http://placehold.it/45x45';
    };
    return imgSrc;
  },

  //Construst the selected Artist object
  selectedArtist(data) {
  	var selectedArtistData = {
  		id : data.id,
      name : data.name,
      pic : data.images[1].url,
      followers : data.followers.total,
      href : data.external_urls.spotify
  	}
  	return selectedArtistData;
  }
	
};

export default { Mixins };  