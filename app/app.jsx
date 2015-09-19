var React      = require('react/addons');
var List       = require('./views/list.jsx');
var Edit       = require('./views/edit.jsx');
var Run        = require('./views/view.jsx');
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
    timers.push({ name: 'hi!' });

    var listProps = {
      timers: timers
    };

    return (
      <div>
        <List {...listProps} />
      </div>
    )
  }
});

module.exports = app;
