function beforeState( nextEvent ) {
  // console.log('before state');
  $speaker.html( nextEvent.name );
  $event.html( nextEvent.title );
  $timing.html( 'at ' + moment(nextEvent.start).format('h:mm a') );
}

function countdownState( nextEvent, countdown) {
  // console.log('countdown state');
  $speaker.html( nextEvent.name );
  $event.html( nextEvent.title );
  $timing.html( 'in ' + countdown + ' minutes' );
}

function liveState( activeEvent ) {
  // console.log('live state');
  $speaker.html( activeEvent.name );
  $event.html( activeEvent.title );
  $timing.html( 'Live Now' );
}

function afterState() {
  // console.log('after state');
  $speaker.html( 'Live Q&As are finished' );
  $event.html( 'Thank you for participating' );
  $timing.hide();
}

/* dom references */
var $speaker, $event, $timing;


$( function() {
  $speaker = $('#live-qa-cell-speaker');
  $event = $('#live-qa-cell-event');
  $timing = $('#live-qa-cell-timing');

  // get schedule json
  getScheduleData().done( function( data ) {
    var activeEvent, nextEvent, countdown;
    var eventSchedule = sortSchedule( data );

    if (eventSchedule && eventSchedule.length) {
      // figure out what state the cell is in
      activeEvent = getActiveEvent( eventSchedule );
      nextEvent = getNextEvent( eventSchedule );

      if (activeEvent) {
        countdown = moment(activeEvent.start).diff(moment(),'minutes');

        if (activeEvent.cue && (countdown <= 15) && (countdown > 0)) {
          // countdown state
          countdownState( activeEvent, countdown );

        } else {
          // live event
          liveState( activeEvent );
        }

      } else if (nextEvent) {
        countdown = moment(nextEvent.start).diff(moment(),'minutes');

        if (countdown > 15) {
          // before state
          beforeState( nextEvent );

        } else if ((countdown <= 15) && (countdown > 0)) {
          // countdown state
          countdownState( nextEvent, countdown );
        }

      } else {
        // no more events
        afterState();
      }


    } else {
      // handle schedule not loaded error
      console.error('could not load schedule!');
    }
  });

});
