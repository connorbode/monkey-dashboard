var React      = require('react/addons');
var list       = require('./views/list.jsx');
var edit       = require('./views/edit.jsx');
var run        = require('./views/view.jsx');
var TimerStore = require('./stores/timer-store');

var app = React.createClass({
  getInitialState: function () {
    return {
      timers: []
    };
  },

  loadTimers: function () {
    var state = Object.assign(this.state, {
      timers: TimerStore.timers
    });

    this.setState(state);
  },

  componentDidMount: function () {
    TimerStore.on(TimerStore.events.CHANGED, this.loadTimers);
  },

  componentWillUnmount: function () {
    TimerStore.off(TimerStore.events.CHANGED, this.loadTimers);
  },

  render: function () {
    var timers = this.props.timers || [];
    timers.push('hi!');

    var listProps = {
      timers: timers
    };

    return (
      <div>
        <list {...listProps} />
      </div>
    )
  }
});

module.exports = app;
