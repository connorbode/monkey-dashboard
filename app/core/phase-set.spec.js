var chai = require('chai');
var expect = chai.expect;
var Phase = require('./phase');
var PhaseSet = require('./phase-set');

describe('PhaseSet', () => {

  var phase_props,
      phase_2_props,
      phase,
      phase2,
      set;

  beforeEach(() => {
    phase_props = {
      name: 'test', 
      duration: 1000
    };
    phase_2_props = {
      name: 'test2',
      duration: 1000
    };
    phase = new Phase(phase_props);
    phase2 = new Phase(phase_2_props);
    set = new PhaseSet();
  });

  it('adds a phase', () => {
    set.add(phase);
    set.add(phase2);
    expect(set.phases.length).to.equal(2);
    expect(set.phases[0].name).to.equal(phase_props.name);
    expect(set.phases[1].name).to.equal(phase_2_props.name);
  });

  it('wont add a phase twice', () => {
    set.add(phase);
    set.add(phase);
    expect(set.phases.length).to.equal(1);
  });

  it('removes a phase', () => {
    set.phases.push(phase);
    set.phases.push(phase2);
    set.remove(phase);
    expect(set.phases.length).to.equal(1);
    expect(set.phases[0].name).to.equal(phase_2_props.name);
  });

  it('emits the changed event when a phase is added', (done) => {
    set.on('changed', () => {
      done();
    });
    set.add(phase);
  });

  it('emits the changed event when a phase is removed', (done) => {
    set.on('changed', () => {
      done();
    });
    set.phases.push(phase);
    set.remove(phase);
  });
});