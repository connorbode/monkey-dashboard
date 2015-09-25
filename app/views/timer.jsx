var React = require('react/addons');

var Timer = React.createClass({
  render: function () {
    return (
      <svg className="timer">
        <path d="M 100 100 a 50 50 0 1 0 0.00001 0" />
      </svg>
    );
  }
});

module.exports = Timer;
