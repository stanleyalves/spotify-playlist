import { ajax, isEmpty, extend } from './utils';

var GetSimilarArtist = (selectedArtistData) => {
  var url = 'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/related-artists';
  console.log(url)
  console.log('similarArtist AJAX')
  ajax({
    url: url,
    method:'GET',
    dataType: 'json',
    success: function(data){
      this.props.similarArtists(data);
    }
  });
}

var GetArtistAlbums = (selectedArtistData) => {
  var url =  'https://api.spotify.com/v1/artists/' + selectedArtistData.id + '/albums';
  ajax({
    url: url,
    method:'GET',
    dataType: 'json',
    success: function(data){
      console.log('ARTIST ALBUMS');
      console.log(data);
    }
  });
}

//Get the artist bio from lastfm
var GetArtistBio = (artist) => {
  console.log('ON Artist BIO')
  var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist.name + '&api_key=cd27c4053cad0d05231bfdc4bf14b7d2&format=json'
  console.log(url)
  ajax({
    url: url,
    method:'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      return data.artist.bio.summary
    }
  });    
}

//Choose the artist image, if none available, use placeholder.
var GetArtistImage = (data) => {
	var imgSrc;
	if (data.images.length > 3) {
    imgSrc = data.images[2].url;
  } else if (data.images.length > 1) {
    imgSrc = data.images[0].url;
  } else {
    imgSrc = 'http://placehold.it/45x45';
  };
  return imgSrc;
}

export default {GetSimilarArtist, GetArtistAlbums, GetArtistBio, GetArtistImage };  