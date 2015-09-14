var Cookies = require('cookies-js');
var TIMERS_COOKIE = 'workhorse_timers';

var timerActions = {

  // loads all the possible timers into the application
  load: () => {
    return Cookies.get(TIMERS_COOKIE);
  },

  // saves all of the timers
  save: (timers) => {
    Cookies.set(TIMERS_COOKIE, timers);
  }
};

module.exports = timerActions;
