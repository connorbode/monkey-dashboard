var Cookies = require('cookies-js');
var TIMERS_COOKIE = 'workhorse_timers';

var actions = (dispatcher) => {
  return {

    // loads all the possible timers into the application
    loadTimers: () => {
      var timers = Cookies.get(TIMERS_COOKIE);
      dispatcher.dispatch('TIMERS_LOADED', { timers: timers });
    },

    // saves all of the timers
    saveTimers: (timers) => {
      Cookies.set(TIMERS_COOKIE, timers);
      dispatcher.dispatch('TIMERS_SAVED');
    }
  };
};

module.exports = actions;
