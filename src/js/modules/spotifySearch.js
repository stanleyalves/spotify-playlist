import { Mixins } from './mixins'
import { ajax, isEmpty, extend } from './utils';
import { SearchHeader } from './components/searchHeader';
import { SelectedArtst } from './components/selectedArtist';
import { Results } from './components/results';
import { Player } from './components/Player';
import { RecentSearches } from './components/RecentSearches';
import { SimilarArtst } from './components/similarArtists';

var App = React.createClass({

  mixins: [Mixins],

  getInitialState() {
    return {
      data: {},
      selectedArtist : undefined, 
      similarArtists : undefined,
      recentSearches : undefined,
      player: undefined
    };
  },

  handleSearchSubmit(data) {
    console.log('handle search submit');
    // this.tester();
    this.setState({
      data:data
    })
  },

  relatedArtists(data) {
    this.setState({
        similarArtists: {
          artists : data.artists
        }
      }
    )
  },

  selectArtist(data){
    console.log(data);
    //heres the magic, set the state of the selected artist.
    //The child components will updated when the state is changed. 
    this.setState({
      selectedArtist: {
        name: data.name, 
        pic : data.pic,
        followers : data.followers,
        href : data.href,
        bio : data.artist.bio.summary
      }
    });
  },
 
  render(){
    return (
      <div className = "wrapper">
        <div className="left-bar open">
          <SearchHeader onSearchSubmit={this.handleSearchSubmit}/>
          <Results data={this.state.data} chooseArtist={this.selectArtist} relatedArtist={this.relatedArtists} />
          <RecentSearches recentSearches = {this.state.recentSearches}/>
        </div>
        <div className="main">
          <SelectedArtst artist={this.state.selectedArtist}/>
          <SimilarArtst similarArtstClick = {this.selectArtist} similarArtists={this.state.similarArtists}/>
          <Player player={this.state.player}/>
        </div>
      </div>
    )
  }
});

export function start() {
    React.render(
    <App />, document.body
  );
}