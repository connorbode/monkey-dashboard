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
  phases.add = (phase) => {
    phases.push(phase);
  };
  phases.remove = (phase) => {
    var index = phases.indexOf(phase);
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
