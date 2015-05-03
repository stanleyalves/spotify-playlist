// import { Mixins } from './mixins'
// import { ajax, isEmpty, extend } from './utils';
// import { SearchHeader } from './components/searchHeader';
// import { SelectedArtst } from './components/selectedArtist';
// import { Results } from './components/results';
// import { Player } from './components/Player';
// import { RecentSearches } from './components/RecentSearches';
// import { SimilarArtist } from './components/similarArtists';

var App = React.createClass({
 
  render(){
    return (
      <div className = "wrapper">
        <h1>Howdy</h1>
      </div>
    )
  }
});

export function start() {
  React.render(
    <App />, document.body
  );
}