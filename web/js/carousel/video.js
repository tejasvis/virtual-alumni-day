(function($) {
  jQuery(document).ready(function($) {
    /*
     * The below example uses Slick Carousel, however this can be
     * extended into any type of carousel, provided it lets you
     * bind events when the slide changes. This will only work
     * if all framed videos have the JS API parameters enabled.
     */
    
    //bind our event here, it gets the current slide and pauses the video before each slide changes.
    $(".slick").on("beforeChange", function(event, slick) {
      console.log("heyy");
      var currentSlide, slideType, player, command;
      
      //find the current slide element and decide which player API we need to use.
      currentSlide = $(slick.$slider).find(".slick-current");
      
      //determine which type of slide this, via a class on the slide container. This reads the second class, you could change this to get a data attribute or something similar if you don't want to use classes.
      slideType = currentSlide.attr("class").split(" ")[1];
      
      //get the iframe inside this slide.
      player = currentSlide.find("iframe").get(0);
      
      if (slideType == "vimeo") {
        command = {
          "method": "pause",
          "value": "true"
        };
      } else {
        command = {
          "event": "command",
          "func": "pauseVideo"
        };
      }
      
      //check if the player exists.
      if (player != undefined) {
        //post our command to the iframe.
        player.contentWindow.postMessage(JSON.stringify(command), "*");
      }
    });
    
    //start the slider
    $(".slick").slick({
      infinite: false,
      arrows: true,
      dots: true,
      slidesToShow: 1,
  
    });
    
    //run the fitVids jQuery plugin to ensure the iframes stay within the item.
    $('.item').fitVids();
    
  });
})(jQuery);