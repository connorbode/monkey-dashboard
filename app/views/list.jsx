var React      = require('react/addons');
var actions    = require('../actions');

var list = React.createClass({
  viewTimer: function (timer) {
    actions.viewTimer(timer);
  },

  render: function () {
    return (
      <div className="timer-list">
        <h2>Timers</h2>
        <ul>
          {this.props.timers.map(timer => {
            return (
              <li><a onClick={this.viewTimer.bind(null, timer)}>{timer.name}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = list;
