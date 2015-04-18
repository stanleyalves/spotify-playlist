import { ajax } from '../utils';
var SearchHeader = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var query = encodeURI(React.findDOMNode(this.refs.searchBar).value.trim());
    var url = 'https://api.spotify.com/v1/search?q='+ query +'&type=artist';

    ajax({
      url: url,
      method:'GET',
      dataType: 'json',
      success: function(data){
        this.props.onSearchSubmit({data:data})
      }.bind(this)
    });
  },

  render() {
    return (
      <header>
        <img className="logo" src ="/assets/img/spotify-logo.svg"/>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text"  placeholder="search for an artist" ref="searchBar" />
          <input value="Go" name="submit" type="submit" />
        </form>
      </header>
    )
  }
});

export default { SearchHeader };  