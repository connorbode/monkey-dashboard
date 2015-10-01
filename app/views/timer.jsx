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
          d="M 100 50 A 50 50, 0, 1, 0, 100 49 Z"
          fill="transparent"
          stroke="black"
          stroke-width="1" />
      </svg>
    );
  }
});

module.exports = Timer
