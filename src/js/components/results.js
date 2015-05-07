var React = require('react');
var Reflux = require('reflux');
var person = require('../data/person');
var actions = require('../actions/actions');
import { ajax, isEmpty, extend } from '../modules/utils';
import { Mixins } from '../modules/mixins';

var Results = React.createClass({

  render() {
    return (
      <div className='results'>
        <ul>
          <h2>results here</h2>
        </ul>
      </div>
    )
     
  }
});

export default { Results };  