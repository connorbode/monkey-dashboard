var React = require('react/addons');

var Timer = React.createClass({
  render: function () {
    return (
      <svg className="timer">
        <path
          d="M 100 50 A 50 50, 0, 1, 0, 50 100" 
          fill="transparent"
          stroke="black"
          stroke-width="1" />
      </svg>
    );
  }
});

module.exports = Timer
