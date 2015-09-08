var page      = require('page');
var React     = require('react/addons');
var editor    = require('./views/editor.jsx');
var container = document.getElementById('container');

var render = (component) => {
  var element = React.createElement(component);
  React.render(element, container);
};

page('/', (context, next) => {
  render(editor);
});

page();
