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
  phases.addPhase = function (phase) {
    phases.push(phase);
  };
  return phases;
};

module.exports = PhaseSet;
