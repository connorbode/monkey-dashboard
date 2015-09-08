var page      = require('page');
var React     = require('react/addons');
var edit      = require('./views/edit.jsx');
var run       = require('./views/run.jsx');
var container = document.getElementById('container');

var render = (component) => {
  var element = React.createElement(component);
  React.render(element, container);
};

page('/timers/:id', (context, next) => {
  render(run);
});

page('/edit', (context, next) => {
  render(edit);
});

page();
