var React = require('react/addons');

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
      <div className="view">{name}</div>
    );
  }
});

module.exports = run;
