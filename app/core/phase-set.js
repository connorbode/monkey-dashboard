var ee = require('events').EventEmitter;

//
// PhaseSet
// ========
//
// A PhaseSet consists of multiple phases.
// PhaseSets can be loaded by the Workhorse
// and run.
//
var PhaseSet = function () {
  this.phases = [];

  this.EVENTS = {
    REMOVED: 'removed',
    ADDED: 'added'
  };

  //
  // indexOf
  // -------
  //
  // indexOf, but based on id.
  //
  this.indexOf = (phase) => {
    var id = phase.id;
    var index = -1;
    this.phases.forEach((p, i) => {
      if (p.id === id)
        index = i;
    });
    return index;
  };

  this.add = (phase) => {
    if (this.indexOf(phase) === -1) {
      this.phases.push(phase);
      this.emit(this.EVENTS.ADDED, phase);
    }
  };

  this.remove = (phase) => {
    var index = this.indexOf(phase);
    if (index > -1) {
      this.phases.splice(index, 1);
      this.emit(this.EVENTS.REMOVED, phase);
      return true;
    }
    else {
      return false;
    }
  };
};

PhaseSet.prototype = Object.create(ee.prototype);

module.exports = PhaseSet;
