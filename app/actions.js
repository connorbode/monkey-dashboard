var Cookies       = require('cookies-js');
var page          = require('page');
var TIMERS_COOKIE = 'WORKHORSE_TIMERS';
var dispatcher = require('./dispatcher');

var actions = {

  // loads all the possible timers into the application
  loadTimers: () => {
    var timers = Cookies.get(TIMERS_COOKIE);
    dispatcher.dispatch('TIMERS_LOADED', { timers: timers });
  },

  // saves all of the timers
  saveTimers: (timers) => {
    Cookies.set(TIMERS_COOKIE, timers);
    dispatcher.dispatch('saveTimers');
  },

  // sets the timer to view
  viewTimer: (timer) => {
    page.show('/timers/' + timer.id);
    dispatcher.dispatch('viewTimer', { timer: timer });
  }
};

dispatcher.registerActionCreator(actions);
module.exports = actions;
