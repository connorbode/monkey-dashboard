//
// PhaseSet
// ========
//
// A PhaseSet consists of multiple phases.
// PhaseSets can be loaded by the Workhorse
// and run.  
//
var PhaseSet = function () {
  var phases = [];

  //
  // findPhaseById
  // -------------
  //
  // indexOf, but based on id.
  //
  var findPhase = (phase) => {
    var id = phase.id;
    var index = -1;
    phases.forEach((p, i) => {
      if (p.id === id)
        index = i;
    });
    return index;
  };

  phases.add = (phase) => {
    if (findPhase(phase) === -1)
      phases.push(phase);
  };

  phases.remove = (phase) => {
    var index = findPhase(phase);
    if (index > -1) {
      phases.splice(index, 1);
      return true;
    }
    else {
      return false;
    }
  };
  return phases;
};

module.exports = PhaseSet;
