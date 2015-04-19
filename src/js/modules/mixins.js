import { ajax, isEmpty, extend } from './utils';

var Mixins = {
	testMixin() {
		alert('test test');
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
	
};

export default { Mixins };  