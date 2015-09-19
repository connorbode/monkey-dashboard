var page      = require('page');
var React     = require('react/addons');
var list      = require('./views/list.jsx');
var edit      = require('./views/edit.jsx');
var run       = require('./views/view.jsx');
var container = document.getElementById('container');

var render = (component) => {
  var props = {
    timers: [
      { name: 'test' },
      { name: 'A new timer!' }
    ]
  };
  var element = React.createElement(component, props);
  React.render(element, container);
};

page('/timers', (context, next) => {
  render(list);
});

page('/timers/:id', (context, next) => {
  render(run);
});

page('/edit', (context, next) => {
  render(edit);
});

page();
