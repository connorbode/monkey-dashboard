var EventEmitter = require('events').EventEmitter;

//
// PhaseSequence
// -------------
//
// A PhaseSequence is based on a PhaseSet, but
// includes repititions of tasks within the set.
//
var PhaseSequence = function (set) {
  this.set = set;
  this.phases = [];

  this.EVENTS = {
    ADDED: 'added',
    REMOVED: 'removed'
  };

  //
  // removeAllById
  // -------------
  //
  // Removes all instances of a phase
  // from the sequence.
  //
  var removeAllById = (phase) => {
    this.phases = this.phases.reduce((phases, p) => {
      if (p.id !== phase.id)
        phases.push(p);
      return phases;
    }, []);
  };

  //
  // add
  // ---
  //
  // Adds a phase to the sequence
  //
  this.add = (phase) => {
    if (this.set.indexOf(phase) === -1)
      throw "the phase provided was not part of the set..";

    this.phases.push(phase);
    this.emit(this.EVENTS.ADDED, phase);
  };

  //
  // removeByIndex
  // -------------
  //
  // Removes a phase from the sequence using the index.
  //
  this.removeByIndex = (index) => {
    if (index > this.phases.length)
      throw "index out of bounds";

    var spliced = this.phases.splice(index, 1);
    this.emit(this.EVENTS.REMOVED, spliced[0]);
  };

  this.set.on(this.set.EVENTS.REMOVED, removeAllById);
};

PhaseSequence.prototype = Object.create(EventEmitter.prototype);

module.exports = PhaseSequence;
