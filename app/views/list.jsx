var React      = require('react/addons');
var TimerStore = require('../stores/timer-store');

var list = React.createClass({
  render: function () {
    return (
      <div className="timer-list">
        <ul>
          {this.props.timers.map(timer => {
            return (
              <li>{timer.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = list;
