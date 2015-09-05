var EventEmitter = require('events').EventEmitter;

var Workhorse = function () {

  // the phases that the timer can go through
  // should be loaded using loadPhaseSet
  var sequence;

  // what phase we are currently in
  var index = 0;

  // how much time is left in the phase
  var timer = 0;
  var interval;

  this.EVENTS = {
    END: 'end',
    TICK: 'tick'
  };

  var TICK_INTERVAL = 1000;

  //
  // loadSequence
  // ------------
  //
  // Loads in the phases for the timer.
  //
  this.loadSequence = function (phaseSequence) {
    sequence = phaseSequence;
  };

  //
  // getPhase
  // --------
  //
  // Retrieves the name of the current phase
  //
  this.getPhase = function () {
    if (!sequence)
      throw "sequence must be loaded first!";
    return sequence.phases[index];
  };

  //
  // setPhase
  // --------
  //
  // Sets the timer to the start of the phase
  // by the index provided.  Sets
  //
  this.setPhase = function (i) {
    if (i > sequence.phases.length)
      throw "Phase index out of bounds";

    index = i;
    timer = sequence.phases[i].duration;
  };

  //
  // incrementPhase
  // --------------
  //
  // Runs the next phase of the timer
  //
  this.incrementPhase = function () {
    var nextIndex;

    if (index === sequence.phases.length - 1)
      nextIndex = 0;
    else
      nextIndex = index + 1;

    this.setPhase(nextIndex);
  };

  //
  // onPhaseEnd
  // ----------
  //
  // This function runs when the current phase comes to an end
  //
  var onPhaseEnd = function () {
    this.incrementPhase();
  };

  //
  // onPhaseTick
  // -----------
  //
  // Handles every tick of the timer
  //
  var onPhaseTick = function () {
    if (timer === 0) {
      onPhaseEnd.apply(this);
      this.emit(this.EVENTS.END);
    } else {
      timer -= 1;
      this.emit(this.EVENTS.TICK);
    }
  };

  //
  // start
  // -----
  //
  // Starts the timer
  //
  this.start = function () {
    interval = setInterval(onPhaseTick.bind(this), TICK_INTERVAL);
  };

  //
  // stop
  // ----
  //
  // Stops the timer
  //
  this.stop = function () {
    clearInterval(interval);
  };

  //
  // getTimeLeft
  // -----------
  //
  // Returns the time left for the current phase
  //
  this.getTimeLeft = function () {
    return timer;
  };
};

Workhorse.prototype = Object.create(EventEmitter.prototype);
module.exports = Workhorse;
