var Workhorse = function () {

  // the phases that the timer can go through
  // should be loaded using loadPhaseSet
  var phases = null;

  // what phase we are currently in
  var index = 0;

  // how much time is left in the phase
  var timer = 0;
  var interval;

  // listeners which will trigger whenever the clock ticks
  var listeners = {
    'tick': [],
    'end': []
  };

  //
  // loadPhaseSet
  // ------------
  //
  // Loads in the phases for the timer.  This is
  // required in order to use the timer.
  //
  this.loadPhaseSet = function (phaseSet) {
    phases = phaseSet;
  };

  // 
  // getPhase
  // --------
  //
  // Retrieves the name of the current phase
  //
  this.getPhase = function () {
    return phases[index];
  };

  //
  // setPhase
  // --------
  //
  // Sets the timer to the start of the phase
  // by the index provided.  Sets 
  //
  this.setPhase = function (i) {
    if (i > phases.length)
      throw "Phase index out of bounds";

    phase = phases[i];
    index = i;
    timer = phase.length;
  };

  //
  // incrementPhase
  // --------------
  //
  // Runs the next phase of the timer
  //
  this.incrementPhase = function () {
    var nextIndex;

    if (index === phases.length - 1)
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
    this.start();
  };  

  //
  // triggerListeners
  // ----------------
  //
  // Runs all event listeners for a given event.
  //
  var triggerListeners = function (event) {
    var i;
    var eventListeners = this.listeners[event];
    for (i = 0; i < eventListeners.length; i += 1) {
      eventListeners[i]();
    }
  };

  //
  // start
  // -----
  //
  // Starts the timer
  //
  this.start = function () {
    var i;
    interval = setInterval(function () {
      if (timer === 0) {
        onPhaseEnd();
        triggerListeners('end');
      } else {
        timer -= 1;
        triggerListeners('tick');
      }
    }.bind(this), 1000);
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
    return this.timer;
  };

  //
  // addListener
  // -----------
  //
  // Adds a hook for an event.  Current events include:
  //
  // - `tick`: Fired at every clock tick
  //
  this.addListener = function (event, callback) {
    this.listeners[event].push(callback);
  };
};











module.exports = Workhorse;