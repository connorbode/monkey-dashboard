var React = require('react/addons');
var List = require('./list.jsx');
var NoTimers = require('./no-timers.jsx');

var menu = React.createClass({
  addTimer: function () {
    console.log('add timer clicked!');
  },

  render: function () {
    var timers = this.props.timers;
    var noTimers = timers.length === 0;
    var listProps = {
      timers: timers
    };

    return (
      <div className="menu">
        <h1>Workhorse</h1>
        {noTimers ? <NoTimers /> : <List {...listProps} />}
        <a href="#" className="add-timer" onClick={this.addTimer}>
          Add a timer
        </a>
      </div>
    );
  }
});

module.exports = menu;
