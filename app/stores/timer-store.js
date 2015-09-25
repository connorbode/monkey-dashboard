var EventEmitter = require('events').EventEmitter;
var dispatcher = require('../dispatcher');
var FakeTimer  = require('../fake-timer');

var TimerStore = Object.assign(EventEmitter.prototype, {
  events: {
    CHANGED: 'CHANGED'
  },
  timers: [ FakeTimer ],
  timer: undefined,
  loadTimers: (payload) => {
    this.timers = payload.timers;
    this.emit(this.events.CHANGED);
  },
  viewTimer: (payload) => {
    this.timer = payload.timer;
    this.emit(this.events.CHANGED);
  }
});

dispatcher.registerStore(TimerStore);
module.exports = TimerStore;
