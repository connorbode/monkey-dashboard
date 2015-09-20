var Phase    = require('./core/phase');
var PhaseSet = require('./core/phase-set');
var Sequence = require('./core/phase-sequence');

var set = new PhaseSet();

var phase1 = new Phase({
  name: 'Work',
  duration: 30
});

var phase2 = new Phase({
  name: 'Rest',
  duration: 10
});

set.add(phase1);
set.add(phase2);

var sequence = new Sequence(set);
sequence.add(phase1);
sequence.add(phase2);

module.exports = sequence;
