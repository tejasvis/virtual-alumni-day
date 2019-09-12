/* global data references */


// youtube player
var player = null;
// jquery references
var $player, $chat, $playlists, $schedule, $nextSpeakerCountdown, $embed;


/* events */
// fix embed heights on document resize
// looks like this is $chat resize only
function onWindowResize() {
  $embed.attr('height', $player.height());
}

/* youtube */
// gets the id portion from the full youtube url
function getYoutubeId( url ) {
  var search = /([0-9a-zA-Z\-\_]+)$/.exec(url);
  var ytid = (search && search.length)? search[1] : null;
  return ytid;
}

// noop
function onYouTubeIframeAPIReady() {
  return false;
}

// autoplay
function onPlayerReady(event) {
  event.target.playVideo();
}

// trigger on video end
var playerStateChangeTimer;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.BUFFERING || event.data == YT.PlayerState.ENDED) {
    console.log('buffering detected, starting timer', event.data);
    // start timer. after 15 seconds, assume feed has ended
    playerStateChangeTimer = moment.duration(15000).timer( {start: true}, function() {
      // yes we get new schedule data
      getScheduleData().done( processData ).fail( function() {
        // handle schedule not loaded error
        console.error('could not load schedule!');
      });
    });

  } else {
    console.log('stopping timer', event.data);
    if (playerStateChangeTimer) {
      playerStateChangeTimer.stop();
      playerStateChangeTimer = null;
    }
  }
}

/* video */
// displays countdown between videos
function showCountdown() {
  $player.html('<p>Countdown to next event: <span id="event-countdown"></span></p>');
}

// load youtube video by url
function updateVideo( url ) {
  var ytid = getYoutubeId( url );

  // something went wrong
  if (ytid === null) {
    $player.html('Please select a video from the schedule below to view.')
    return false;
  }

  // check to see if player needs to be initialized
  if (player) {
    player.loadVideoById(ytid);

  } else {
    player = new YT.Player($player.attr('id'), {
      height: $player.height(),
      width: $player.width(),
      videoId: ytid,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

/* chat */
// state when no chat available
function clearChatBox() {
  $chat.html('Chat will become available for the next event!');
}

// loads chat window into the dom element
function updateChat( url ) {
  var embedurl = "https://www.youtube.com/live_chat?v=" + getYoutubeId( url ) + "&embed_domain=" + window.location.host;

  // reuse the iframe if it has been created already
  if ($embed && $embed.length) {
    $embed.attr('src', embedurl);

  } else {
    $chat.html("<iframe id='chat-embed' width='100%' height='100%' src='" + embedurl + "'/>");
  }
}

/* schedule */
// updates the countdown to the next speaker
function updateNextSpeakerCountdown( nextEvent ) {
  var next = (nextEvent && nextEvent.start)? moment( nextEvent.start ) : false;
  var content = [];

  if (next) {
    content = [
      '<span class="next-speaker-intro">Next Speaker: </span>',
      '<span class="next-speaker-time">' + nextEvent.name + ' at ' + next.format('h:mm a') + '</span>'
    ];
  } else {
    content = '<span class="next-speaker-intro">The live Q&As have finished for the day</span>'
  }

  $('#next-speaker-countdown').html( content );
}

// builds the schedule list
function updateSchedule( activeEvent, eventSchedule ) {
  if (eventSchedule && eventSchedule.length) {
    // clear out old markup
    $schedule.html('');

    // traverse the list and look for events that start after the current time
    eventSchedule.forEach( function(cv, ci) {
      // this is tired brain logic here
      var listing_classes = 'schedule-listing';
      var ttstart;
      var online = '';

      if (activeEvent === cv) {
        // if an event is cued before it's official start time, display a "time to event" in minutes
        ttstart = moment( activeEvent.start ).diff(moment(),'minutes');
        if (activeEvent.cue && ttstart > 0) {
          online = ' <span class="online-status">(Online in ' + ttstart + ' minutes)</span>';
        } else {
          online = ' <span class="online-status">(Online Now)</span>';
        }
      } else {
        // convoluted way of saying 'if there's an active event that has been cued, all events following that event have not ended, regardless of time'
        if (activeEvent && activeEvent.cue) {
          if (moment( activeEvent.start ).isAfter( moment(cv.start) )) {
            listing_classes += ' has-ended';
          }
        } else {
          if (moment().isAfter(moment(cv.start))) {
            listing_classes += ' has-ended';
          }
        }
      }


      var $header = $('<h2>' + cv.name + online + '</h2>');
      var $title = $('<p class="speaker-title note">' + (cv.title || '') + '</p>');
      var $speech = $('<h3 class="speech-title">' + (cv.speech || '') + '</h3>');
      // can't figure out a way to get zone abbreviation off the converted-to-local moment object
      // might be due to all the utc() and local() flying around
      var $eventTime = $('<h2 class="start-time">' + moment( cv.start ).format('h:mm a') + ' ' + moment.tz(moment.tz.guess()).format('z') + '</h2>');
      var $listing = $('<li class="' + listing_classes + '" data-videoid="'+ getYoutubeId(cv.url) + '" data-unique="' + cv.unique + '"/>').append( [$header,$title,$speech,$eventTime] );

      $schedule.append($listing);
    });

  } else {
    $schedule.html('Schedule could not be loaded.');
  }
}

// scrolls the schedule div to the active listing
function scrollScheduleToEvent( activeEvent ) {
  var $active;

  if ( $schedule && $schedule.length ) {
    if (activeEvent) {
      $active = $schedule.find( 'li[data-unique="' + activeEvent.unique + '"]');
      $schedule.scrollTop( $active.position().top );
    } else {

      $schedule.scrollTop( 0 );
    }
  }
}

// takes json data and does things
function processData( data ) {
  if (data && data.length) {
    var eventSchedule = sortSchedule( data );
    var activeEvent = getActiveEvent( eventSchedule );
    var nextEvent = getNextEvent( eventSchedule );

    console.log('active:', activeEvent, 'next:', nextEvent);

    // this sets the "next speaker" section in the schedule heading
    // if an event is cued early, use that event
    if (activeEvent && activeEvent.cue && moment(activeEvent.start).diff(moment(), 'minutes') > 0) {
      updateNextSpeakerCountdown( activeEvent );
    } else {
      updateNextSpeakerCountdown( nextEvent );
    }


    // build schedule markup
    updateSchedule( activeEvent, eventSchedule );

    // if livechat is happening, load the video and chat
    if (activeEvent) {
      // load video in player
      updateVideo( activeEvent.url);
      // load chat embed
      updateChat( activeEvent.url );
      // scroll schedule
      scrollScheduleToEvent( activeEvent );

    } else if (nextEvent) {
      // beginning of the day
      updateVideo( nextEvent.url);

      // clear chat box
      updateChat( nextEvent.url );


    } else {
      // end of day
      // load last speaker video
      updateVideo( eventSchedule[eventSchedule.length - 1].url );

      updateChat( eventSchedule[eventSchedule.length - 1].url);

      // scroll schedule
      scrollScheduleToEvent();
    }

  } else {
    // another fail state (use reject()?)
  }
}


/* init */
$(function() {
  // set references
  $player = $('#youtube-player');
  $chat = $('#youtube-chat');
  $playlists = $('#playlists');
  $schedule = $('#live-schedule');
  $nextSpeakerCountdown = $('#next-speaker-countdown');
  $embed = $('#chat-embed');

  // bind events
  // $(window).on('resize', onWindowResize);

  // make json schedule request
  getScheduleData().done( processData ).fail( function() {
    // handle schedule not loaded error
    console.error('could not load schedule!');
  });

});
