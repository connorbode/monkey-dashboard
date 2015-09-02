//
// Phase
// =====
//
// A Phase is a single iteration of the timer.
//
var Phase = function (params) {
  this.name = params.name;
  this.duration = params.duration;
};

module.exports = Phase;