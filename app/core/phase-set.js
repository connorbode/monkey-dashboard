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

  var EVENTS = {
    CHANGED: 'changed'
  };

  //
  // findPhaseById
  // -------------
  //
  // indexOf, but based on id.
  //
  var findPhase = (phase) => {
    var id = phase.id;
    var index = -1;
    this.phases.forEach((p, i) => {
      if (p.id === id)
        index = i;
    });
    return index;
  };

  this.add = (phase) => {
    if (findPhase(phase) === -1) {
      this.phases.push(phase);
      this.emit(EVENTS.CHANGED);
    }
  };

  this.remove = (phase) => {
    var index = findPhase(phase);
    if (index > -1) {
      this.phases.splice(index, 1);
      this.emit(EVENTS.CHANGED);
      return true;
    }
    else {
      return false;
    }
  };
};

PhaseSet.prototype = Object.create(ee.prototype);

module.exports = PhaseSet;
