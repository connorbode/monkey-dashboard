var simflux    = require('simflux');
var dispatcher = new simflux.Dispatcher();
var stores     = require('./stores');
var actions    = require('./actions')(dispatcher);

Object.keys(stores).forEach((key) => dispatcher.registerStore(stores[key]));
dispatcher.registerActionCreator(actions);

module.exports = dispatcher;
