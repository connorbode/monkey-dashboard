var React      = require('react/addons');
var TimerStore = require('../stores/timer-store');

var list = React.createClass({
  loadTimers: () => {
    var state = this.state;
    state.timers = TimerStore.timers;
    this.setState(state);
  },

  getInitialState: () => {
    return {
      timers: []
    };
  },

  componentDidMount: () => {
    TimerStore.on(TimerStore.events.CHANGED, this.loadTimers);
  },

  render: () => {
    return (
      <div className="timer-list">
        TIMERS
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
