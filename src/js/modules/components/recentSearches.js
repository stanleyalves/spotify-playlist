import { ajax, isEmpty, extend } from '../utils';
var RecentSearches = React.createClass({
  render() {
    if (this.props.similarArtists === undefined ) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="recent-searches">
          <h3>recent searches</h3>
          <ul>
            <li>
              <img className="artist-pic"  src="http://lorempixel.com/output/people-q-c-300-300-8.jpg"/>
            </li>
          </ul>
        </div>
      );
    }
  }
});

export default { RecentSearches };  