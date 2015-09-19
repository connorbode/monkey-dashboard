var page      = require('page');
var React     = require('react/addons');
var App       = require('./app.jsx');
var container = document.getElementById('container');

var render = (page) => {
  var props = {
    page: page
  };

  var element = React.createElement(App, props);
  React.render(element, container);
};

page('/timers', (context, next) => {
  render('list');
});

page('/timers/:id', (context, next) => {
  render('run');
});

page('/edit', (context, next) => {
  render('edit');
});

page();
