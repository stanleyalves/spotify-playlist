var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { Mixins } from '../modules/mixins';

var Results = React.createClass({
	mixins: [Mixins],
  render() {
    var obj = this.props.results;
    //Check to see if the object is empty, if so return an empty <li>
    if (isEmpty(obj)) {
      return (
        <li></li>
      )
    } else {
    	console.log(obj);
      var artistArray = obj.artists.items.slice(0, 10);
      console.log('Results Data:')
      //N.B: http://stackoverflow.com/questions/29549375/react-0-13-class-method-undefined
      // Because your code is in strict mode (modules are always in strict mode),
      // this is undefined inside the function you pass to .map.
      //You either have to explicitly set the context by passing

      var artists = artistArray.map(function (data, i){
        var imgSrc = this.chooseArtistImage(data);
        return (
          <li>
            <a onClick={actions.selectArtist} className="result" key={data.id}>
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