
/*********************
 * Hide header on scroll down, show on scroll up
 * * 
 * *******************/


$(document).ready(function () {

  /** For screen widths greater than 768px(mobile) the
   * sticky header on each cell toggles on hover.
   */
  
    if(isMyStuffScrolling()){
    
    
      if ($(window).width()> 768){ 
     

    setTimeout(function () { $('#stickyHeaderContent').hide() }, 2000);

    $('.cellContentHeader').mouseenter(function () {

      $(this).children("#stickyHeaderContent").fadeIn();
    });

    $('.cellContentHeader').mouseleave(function () {
      $(this).children("#stickyHeaderContent").fadeOut();
    });

    }
  }
  else{
  // Initial scroll position
  var scrollState = 0;

  // Store navbar classes
  var navClasses = document.getElementById('stickyHeaderContent').classList;

  // returns current scroll position
  var scrollTop = function () {
    return window.scrollY;
  };


  // Primary scroll event function
  var scrollDetect = function (home, down, up) {
    // Current scroll position
    var currentScroll = scrollTop();
    if (scrollTop() === 0) {
      home();
    } else if (currentScroll > scrollState) {
      down();
    } else {
      up();
    }

    // Set previous scroll position
    scrollState = scrollTop();


  };

  function homeAction() {

  }

  function downAction() {
    navClasses.remove('open');
    navClasses.add('collapse');
  }

  function upAction() {
    navClasses.remove('collapse');
    navClasses.add('open');
  }

  window.addEventListener("scroll", function () {
    scrollDetect(homeAction, downAction, upAction);
  });



  }




});

/***
 * 
 * this function checks for the existence of scroll bar 
 */

function isMyStuffScrolling() {
  
  var docHeight = $(document).height();
  var scroll    = $(window).height() + $(window).scrollTop();
  return (docHeight == scroll);
} 