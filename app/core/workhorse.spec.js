//
// it..
// emits a tick listener when it ticks
// starts at the first phase when loaded
// can set the phase
// returns the proper amount of time left
//

var chai = require('chai');
var expect = chai.expect;
var Phase = require('./phase');
var PhaseSet = require('./phase-set');
var PhaseSequence = require('./phase-sequence');
var Workhorse = require('./workhorse');

describe('Workhorse', () => {

  var phase1,
      phase2,
      set,
      sequence,
      workhorse;

  beforeEach(() => {
    workhorse = new Workhorse();
    phase1 = new Phase({
      name: 'phase1',
      duration: 1
    });
    phase2 = new Phase({
      name: 'phase2',
      duration: 2
    });
    set = new PhaseSet();
    set.add(phase1);
    set.add(phase2);
    sequence = new PhaseSequence(set);
    sequence.add(phase1);
    sequence.add(phase2);
    sequence.add(phase1);
  });

  it('throws an error if getPhase is called before a sequence is loaded', () => {
    expect(workhorse.getPhase).to.throw;
  });

  it('starts at the first phase in the sequence', () => {
    workhorse.loadSequence(sequence);
    expect(workhorse.getPhase()).to.deep.equal(phase1);
  });

  it('properly increments the phase', () => {
    workhorse.loadSequence(sequence);
    workhorse.incrementPhase();
    expect(workhorse.getPhase()).to.deep.equal(phase2);
    workhorse.incrementPhase();
    expect(workhorse.getPhase()).to.deep.equal(phase1);
    workhorse.incrementPhase();
    expect(workhorse.getPhase()).to.deep.equal(phase1);
  });

  it('can set the phase by index', () => {
    workhorse.loadSequence(sequence);
    workhorse.setPhase(1);
    expect(workhorse.getPhase()).to.deep.equal(phase2);
    expect(workhorse.getTimeLeft()).to.equal(phase2.duration);
  });

  it('increments the phase when the phase ends', (done) => {
      workhorse.loadSequence(sequence);
      workhorse.start();
      setTimeout(() => {
        expect(workhorse.getPhase()).to.deep.equal(phase2);
        workhorse.stop();
        done();
      }, 1000);
  });

  it('reduces time while ticking', (done) => {
    workhorse.loadSequence(sequence);
    workhorse.setPhase(1);
    workhorse.start();
    setTimeout(() => {
      expect(workhorse.getTimeLeft()).to.equal(phase2.duration - 1);
      workhorse.stop();
      done();
    }, 1000);
  });

  it('emits the tick event on tick', (done) => {
    workhorse.loadSequence(sequence);
    workhorse.setPhase(1);
    workhorse.on(workhorse.EVENTS.TICK, () => {
      workhorse.stop();
      done();
    });
    workhorse.start();
  });

  it('emits the end event when the phase is done', (done) => {
    workhorse.loadSequence(sequence);
    workhorse.on(workhorse.EVENTS.END, () => {
        workhorse.stop();
        done();
    });
    workhorse.start();
  });


});
