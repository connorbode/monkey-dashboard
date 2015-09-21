var chai = require('chai');
var expect = chai.expect;
var PhaseSequence = require('./phase-sequence');
var PhaseSet = require('./phase-set');
var Phase = require('./phase');

describe('PhaseSequence', () => {

  var phase1,
      phase2,
      set;

  beforeEach(() => {
    phase1 = new Phase({
      duration: 1000,
      name: 'phase1'
    });

    phase2 = new Phase({
      duration: 1000,
      name: 'phase2'
    });

    set = new PhaseSet();
  });

  it('throws an error if the phase provided is not part of the phase set', () => {
    set.add(phase1);
    var sequence = new PhaseSequence('test', set);
    expect(sequence.add.bind(null, phase2)).to.throw;
  });

  it('adds a phase to the sequence', () => {
    set.add(phase1);
    var sequence = new PhaseSequence('test', set);
    sequence.add(phase1);
    expect(sequence.phases.length).to.equal(1);
    expect(sequence.phases[0].name).to.equal('phase1');
  });

  it('emits a changed event when a phase gets added to the sequence', done => {
    set.add(phase1);
    var sequence = new PhaseSequence('test', set);
    sequence.on(sequence.EVENTS.ADDED, (p) => {
      expect(p.id).to.equal(phase1.id);
      done();
    });
    sequence.add(phase1);
  });

  it('throws an error if trying to remove an index that is out of bounds', () => {
    set.add(phase1);
    var sequence = new PhaseSequence('test', set);
    expect(sequence.removeByIndex.bind(null, 3)).to.throw;
  });

  it('removes a phase from the sequence by its index', () => {
    set.add(phase1);
    set.add(phase2);
    var sequence = new PhaseSequence('test', set);
    sequence.phases.push(phase1, phase2, phase1);
    sequence.removeByIndex(1);
    expect(sequence.phases.length).to.equal(2);
    expect(sequence.phases[0].name).to.equal('phase1');
    expect(sequence.phases[1].name).to.equal('phase1');
  });

  it('emits a changed event when a phase is removed from the sequence', done => {
    set.add(phase1);
    var sequence = new PhaseSequence('test', set);
    sequence.phases.push(phase1);
    sequence.on(sequence.EVENTS.REMOVED, (p) => {
      expect(p.id).to.equal(phase1.id);
      done();
    });
    sequence.removeByIndex(0);
  });

  it('removes any instances of a phase from the sequence when the sequence is removed from the set', () => {
    set.add(phase1);
    set.add(phase2);
    var sequence = new PhaseSequence('test', set);
    sequence.phases.push(phase1, phase1, phase1, phase1, phase2);
    set.emit(set.EVENTS.REMOVED, phase1);
    expect(sequence.phases.length).to.equal(1);
    expect(sequence.phases[0].name).to.equal('phase2');
  });

  it('has a name accessible', () => {
    var sequence = new PhaseSequence('test', set);
    expect(sequence.name).to.equal('test');
  });
});
