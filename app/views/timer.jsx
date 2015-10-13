var React = require('react/addons');
var TwoDee = require('two-dee');
var Point = TwoDee.Point;
var Circle = TwoDee.Circle;

var Timer = React.createClass({
  getInitialState: function () {
    return {
      fill: 0.25
    };
  },

  render: function () {
    var radius = 50;

    return (
      <svg className="timer">
        <path
          d="M 230 230 A 45 45, 0, 1, 1, 275 275 "
          fill="transparent"
          stroke="black"
          strokeWidth="1" />
      </svg>
    );
  }
});

module.exports = Timer
