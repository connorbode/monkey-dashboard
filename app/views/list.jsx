var React      = require('react/addons');
var TimerStore = require('../stores/timer-store');

var list = React.createClass({
  loadTimers: function () {
    var state = this.state;
    state.timers = TimerStore.timers;
    this.setState(state);
  },

  getInitialState: function () {
    return {
      timers: []
    };
  },

  componentDidMount: function () {
    TimerStore.on(TimerStore.events.CHANGED, this.loadTimers);
  },

  render: function () {
    return (
      <div className="timer-list">
        <ul>
          {this.state.timers.map(timer => {
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
