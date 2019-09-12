$(document).ready(function(){
  var $widgetIframe=$('#soundcloud-player');
  var $play = $('#playBtn');
  var widget= SC.Widget($widgetIframe[0]);

  $('#new-window-link').on('click', function(e) {
    e.preventDefault();
    window.open($(e.currentTarget).attr('href'), '_soundcloud');
    return false;
  })

  widget.bind(SC.Widget.Events.READY,function(){

      widget.bind(SC.Widget.Events.PLAY, function() {
        $play.addClass('is-playing');
      });

      widget.bind(SC.Widget.Events.PAUSE, function() {
        $play.removeClass('is-playing');
      });

      $('#previousBtn').click(function() {
        widget.prev();
      });

      $play.click(function(e){
        if ($play.hasClass('is-playing')) {
          widget.pause();
        } else {
          widget.play();
        }
      });

      $('#nextBtn').click(function() {
        widget.next();
      });
  });
});
