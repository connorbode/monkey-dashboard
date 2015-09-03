var uuid = require('node-uuid');

//
// Phase
// =====
//
// A Phase is a single iteration of the timer.
//

var Phase = function (params) {
  this.id = uuid.v4();
  this.name = params.name;
  this.duration = params.duration;
};

module.exports = Phase;