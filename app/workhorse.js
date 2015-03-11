var Workhorse = function () {

  // the phases that the timer can go through
  this.phases = {
    work: {
      length: 1800
    },
    rest: {
      length: 150
    }
  };

  // what phase we are currently in
  this.phase = 'work';

  // how much time is left in the phase
  this.timer = 0;

  // listeners which will trigger whenever the clock ticks
  this.listeners = {
    'tick': [],
    'end': []
  };
};

Workhorse.prototype.getPhase = function () {
  return this.phase;
};

Workhorse.prototype.start = function () {
  var i;
  this.timer = this.phases[this.phase].length;
  this.interval = setInterval(function () {
    if (this.timer === 0) {
      this.endPhase();
      for (i = 0; i < this.listeners.end.length; i += 1) {
        this.listeners.end[i]();
      }
    } else {
      this.timer -= 1;
      for (i = 0; i < this.listeners.tick.length; i += 1) {
        this.listeners.tick[i]();
      }
    }
  }.bind(this), 1000);
};

Workhorse.prototype.endPhase = function () {
  clearInterval(this.interval);
};

Workhorse.prototype.getTimeLeft = function () {
  return this.timer;
};

Workhorse.prototype.addListener = function (event, callback) {
  this.listeners[event].push(callback);
};