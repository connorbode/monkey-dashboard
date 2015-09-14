var simflux    = require('simflux');
var dispatcher = new simflux.Dispatcher();
var stores     = require('./stores');
var actions    = require('./actions')(dispatcher);

stores.forEach(dispatcher.registerStore);
dispatcher.registerActionCreator(actions);

module.exports = dispatcher;
