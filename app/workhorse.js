var Workhorse = function () {

  // the phases that the timer can go through
  this.phases = [
    {
      name: 'work',
      length: 1800
    },
    {
      name: 'rest',
      length: 150
    }
  ];

  // what phase we are currently in
  this.index = 0;

  // how much time is left in the phase
  this.timer = 0;

  // listeners which will trigger whenever the clock ticks
  this.listeners = {
    'tick': [],
    'end': []
  };
};


// 
// getPhase
// --------
//
// Retrieves the name of the current phase
//
Workhorse.prototype.getPhase = function () {
  return this.phase;
};

//
// setPhase
// --------
//
// Sets the timer to the start of the phase
// by the index provided.  Sets 
//
Workhorse.prototype.setPhase = function (index) {
  var phase;

  if (index > this.phases.length)
    throw "Phase index out of bounds";

  phase = this.phases[index];
  this.index = index;
  this.timer = phase.length;
};

//
// incrementPhase
// --------------
//
// Runs the next phase of the timer
//
Workhorse.prototype.incrementPhase = function () {
  var nextIndex;

  if (this.index === this.phases.length - 1)
    nextIndex = 0;
  else
    nextIndex = this.index + 1;

  this.setPhase(nextIndex);
};

//
// start
// -----
//
// Starts the timer
//
Workhorse.prototype.start = function () {
  var i;
  this.interval = setInterval(function () {
    if (this.timer === 0) {
      this.onPhaseEnd();
      triggerListeners('end');
    } else {
      this.timer -= 1;
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
Workhorse.prototype.stop = function () {
  clearInterval(this.interval);
};

// 
// onPhaseEnd
// ----------
//
// This function runs when the current phase comes to an end
//
Workhorse.prototype.onPhaseEnd = function () {
  this.incrementPhase();
  this.start();
};

//
// getTimeLeft
// -----------
//
// Returns the time left for the current phase
//
Workhorse.prototype.getTimeLeft = function () {
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
Workhorse.prototype.addListener = function (event, callback) {
  this.listeners[event].push(callback);
};

//
// triggerListeners
// ----------------
//
// Runs all event listeners for a given event.
//
Workhorse.prototype.triggerListeners = function (event) {
  var i;
  var eventListeners = this.listeners[event];
  for (i = 0; i < eventListeners.length; i += 1) {
    eventListeners[i]();
  }
};