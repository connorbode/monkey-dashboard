var React = require('react/addons');
var Timer = require('./timer.jsx');

var run = React.createClass({
  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  render: function () {
    var name = "You don't have any timers..";

    if (this.props.timer)
      name = this.props.timer.name;

    return (
      <div className="view">
        <h2>{name}</h2>
        <Timer />
      </div>
    );
  }
});

module.exports = run;
