var scheduleURL = '/schedule';
/* generic schedule utilities */
// gets data
function getScheduleData() {
  return $.getJSON(scheduleURL); // .promise()?
}

// sorts the schedule by starting time
function sortSchedule( tosort ) {
  var sorted;
  if (tosort && tosort.length) {
    // dont mutate source
    sorted = tosort.slice();
    sorted.sort( function(a,b) {
      var ma = moment(a.start);
      var mb = moment(b.start);
      if (ma.isBefore( mb )) {
        return -1;
      } else {
        if (mb.isBefore( ma )) {
          return 1;
        }
      }
      return 0;
    });
  }

  return sorted;
}

// return the first active event in the schedule
function getActiveEvent( eventSchedule ) {
  var activeEvent = null;
  if (eventSchedule && eventSchedule.length) {
    eventSchedule.some(function(cv, ci, list) {
      var nextEvent = list[ci+1] || false;

      // splitting up logic cause it's causing too many bugs
      if (cv.cue) {
        activeEvent = cv;
        return true;
      }

      if (nextEvent && moment().isBetween(moment(cv.start),moment(nextEvent.start))) {
        activeEvent = cv;
      }

      return false;
    });
  }

  return activeEvent;
}

// gets the next event (chronologically)
function getNextEvent( eventSchedule ) {
  var nextEvent = null;
  var prevEvent;

  if (eventSchedule && eventSchedule.length) {
    eventSchedule.some(function(cv, ci, list) {
      prevEvent = ci > 0? list[ci-1] : cv;

      if (cv.cue) {
        nextEvent = list[ci+1] || false;
        return true;

      } else if (moment().isBefore( moment(cv.start) )) {
        nextEvent = cv;
        return true;
      }

      return false;
    });
  }

  return nextEvent;
}
