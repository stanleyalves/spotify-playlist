import { ajax, isEmpty, extend } from '../utils';
var Player = React.createClass({
  render() {
    if (this.props.player === undefined ) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="player-wrapper">
          <div className="player">
            <h3>Player Here</h3>
          </div>
          <div className="other-tracks">
            <ul>
              <li><a href="#">Track Name here</a></li>
            </ul>
          </div>
        </div>
      )
    }
  }
});

export default { Player };  