var React      = require('react/addons');
var Menu       = require('./views/menu.jsx');
var Edit       = require('./views/edit.jsx');
var View       = require('./views/view.jsx');
var TimerStore = require('./stores/timer-store');
var FakeTimer  = require('./fake-timer');

var app = React.createClass({
  getInitialState: function () {
    return {
      timers: TimerStore.timers,
      timer: TimerStore.timer
    };
  },

  loadTimers: function () {
    var state = Object.assign(this.state, {
      timers: TimerStore.timers,
      timer: TimerStore.timer
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
    var timers = this.state.timers || [];
    var timer = this.state.timer;
    timers.push(FakeTimer);
    console.log(timers);

    var menuProps = {
      timers: timers
    };

    var viewProps = {
      timer: timer
    };

    return (
      <div>
        <Menu {...menuProps} />
        <View {...viewProps} />
      </div>
    )
  }
});

module.exports = app;
