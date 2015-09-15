var EventEmitter = require('events').EventEmitter;

var TimerStore = Object.assign(EventEmitter.prototype, {
  events: {
    CHANGED: 'CHANGED'
  },
  timers: [],
  loadTimers: (payload) => {
    this.timers = payload.timers;
    this.emit(this.events.CHANGED);
  }
});

module.exports = TimerStore;
