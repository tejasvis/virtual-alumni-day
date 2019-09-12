/**
 * Used to store user session info.  It uses cookies to persist
 * data as key-value pairs.
 *
 * Include the following javascript library in your HTML head element:
 * "<script src = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"> </script>"
 *
 * @constructor
 */
function VADSession()
//TODO: Allow to set an expiry date to session...
//TODO: Allow to set domain/path to session...
{
    /**
     * Get the value associated with given session key.
     *
     *  @param  {string} key - the key name
     *  @return {string} the key's value
     */

    this.getValue = function ( key ) {
        return Cookies.get( key );
    };


    /**
     * Get all session key-value pairs.
     *
     * @return {object} containing list of all session key-value pairs.
     */
    this.getAllKeyValuePairs = function () {
        return Cookies.get();
    }

    /**
     * Assign the value to the key and store them in this
     * session.
     *
     * @param key {string} the key to store
     * @param val {string] the value to store
     *
     * @return (string) status message
     */
    this.setSingleKeyValue = function ( key, val ) {
        // store key-value pair in session...
        Cookies.set( key, val,{ domain: '.ucla.edu' } );

        return 'Setting key-value pair: "${key}:${val}"'
                .replace( "${key}", key )
                .replace( "${val}", val );
    };

    /**
     * Store all key-value pairs in this session.
     * { domain: 'alumniday.ucla.edu' } 
     * @param obj {object} object of key-value pairs
     *
     * @returns (string) status message
     */
    this.setMultipleKeyValues = function ( obj ) {
        let key;
        // copy key-value pairs into session...
        for ( key in obj )
        {
            Cookies.set( key, obj[key],{ domain: '.ucla.edu' });
        }

        return 'Current collection of key-value pairs: ${key-value-pairs}'
                .replace( "${key-value-pairs}", obj.toString() )
    };


    /**
     * remove all key-value pairs in this session.
     * { domain: 'alumniday.ucla.edu' } 
     param key {string} the key to store
     * @param val {string] the value to store
     *
     * @return (string) status message
     */
    this.removeMultipleKeyValuesCookie = function ( obj ) {
        let key;
        // remove key-value pairs from session...
        for ( key in obj )
        {
            Cookies.remove( key,{ domain: '.ucla.edu' });
        }

        return true;
    };


/**
     * remove public id key-value pairs in this session.
     * { domain: 'alumniday.ucla.edu' } 
     * @param obj {object} object of key-value pairs
     *
     * @returns (string) status message
     */
    this.removeSingleKeyValueCookie = function ( key ) {
       
            // remove key-value pair in session...
            Cookies.remove( key, { domain: '.ucla.edu' } );
    
            
        return true;
    };


    /**
     * Does this session contain the given key?
     *
     * @param searchKey {string} key - the key to search
     *
     * @returns (boolean) TRUE if key is found, otherwise FALSE
     */
    this.containsKey = function ( searchKey ) {
        for ( key in Cookies.get() )
        {
            if ( key === searchKey )
                return true;
        }

        return false;

    };

    /**
     * Does this session have a valid value assigned to the given key?
     * A valid value is non-null, non-empty and non-whitespace.
     *
     * @param   {string} key - the key to search
     *
     * @returns (boolean) TRUE if valid, otherwise FALSE
     */
    this.hasValidValue = function ( key ) {

        var foundValue = Cookies.get( key );

        return foundValue !== null &&
               foundValue !== undefined &&
               foundValue.trim() !== "";
    };

    /**
     * Is the VAD user already logged in?
     *
     * @return {boolean} TRUE if "checked-in", otherwise FALSE
     */
    this.isAlreadyCheckedIn = function () {
        // load user session info...
        var id = "crmId";
        var fName = "firstName";
        var lName = "lastName";

        // determine whether user is checked-in...
        var isCheckedIn = vadSession.hasValidValue( id ) &&
                          vadSession.hasValidValue( fName ) &&
                          vadSession.hasValidValue( lName );


        // if user is already "checked-in"...
        if ( isCheckedIn )
        {
            return true;
        }

        // else...
        return false;
    };


}


/**
 * Used to store user session info.  It uses cookies to persist
 * data as key-value pairs.
 *
 * Include the following javascript library in your HTML head element:
 * "<script src = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"> </script>"
 *
 * @constructor
 */
function VADClock(){


     /**
     * Get the count down days, hours and seconds pairs.
     *
     * @return {object} containing list of all session key-value pairs.
     */
    var TAB = "\t";

    this.getCountDownClock=function(){

        
// Set the date we're counting down to
var countDownDate = new Date("May 18, 2019 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  
  document.getElementById("count-title1").innerHTML="Days";
  document.getElementById("count-title2").innerHTML="Hours";
  document.getElementById("count-title3").innerHTML="Minutes";
  document.getElementById("centennialClockDisplayDays").innerHTML=days;
  document.getElementById("centennialClockDisplayHours").innerHTML=hours;
  document.getElementById("centennialClockDisplayMins").innerHTML=minutes;

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
  //  document.getElementById("centennialClockDisplay").innerHTML = "EXPIRED";
  }
}, 1000);



    };/** end of getCountDownClock */



    /**
     * Get the count down days, hours and seconds pairs Array .
     *
     * @return {object} containing list of all session key-value pairs.
     */

    this.getCountDownClockArray=function(theClock){

        var result="";
        for(var i=0;i<theClock.length;++i){
            result+=theClock[i]+" ";
            console.log(theClock.length);
        }

        return result;

    };

}
/**End of VadClock */




function vadCountDownClock(){


this.getCentennialClock=function(){
    
    
    // Create Countdown
    var Countdown = {   
        // Backbone-like structure
        $el: $('.countdown'),

        // Params
        countdown_interval: null,
        total_minutes     : 0,
        total_seconds     : 0,
        total_hours       : 0,
        end_date :0,
        now:0,
        days_difference:0,
        days:0,

        // Initialize the countdown  
        init: function() {
     
        // DOM
        this.$ = {
        days  : this.$el.find('.bloc-time.days .figure'),
        hours  : this.$el.find('.bloc-time.hours .figure'),
        minutes: this.$el.find('.bloc-time.min .figure')
    
         };
     
        // Init countdown values
        this.values = {
        days  : this.$.days.parent().attr('data-init-value'),
        hours  : this.$.hours.parent().attr('data-init-value'),
        minutes: this.$.minutes.parent().attr('data-init-value')
        };
        
        //Initialize countdown date , Set the date we're counting down to
        this.end_date=new Date("May 18, 2019 10:00:00").getTime();
        
        //Get today's date and time
        this.now = new Date().getTime();
        
        this.days_difference=this.end_date-this.now;
        
        this.days = Math.floor(this.days_difference/ (1000 * 60 * 60 * 24));

        this.total_hours = Math.floor(((this.days_difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+this.values.hours);

        this.total_minutes=Math.floor(((this.days_difference% (1000 * 60 * 60)) / (1000 * 60))+this.values.minutes);
  
        this.values.minutes=this.total_minutes;
        this.values.hours=this.total_hours;
        this.values.days=this.days;

        // Animate countdown to the end 
        this.count();    
        },

        count: function() {
            var that=this,
            $day_1=this.$.days.eq(0);
            $day_2=this.$.days.eq(1);
            $day_3=this.$.days.eq(2);
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1  = this.$.minutes.eq(0),
            $min_2  = this.$.minutes.eq(1);
        
        //Days
        that.checkDay(that.values.days, $day_1, $day_2,$day_3);
        
        // Hours
        that.checkHour(that.values.hours, $hour_1, $hour_2);

        // Minutes
        that.checkHour(that.values.minutes, $min_1, $min_2);
            
            this.countdown_interval = setInterval(function() {

                if(that.total_minutes >= 0) {

                --that.values.minutes;   

                if(that.values.hours >= 0 && that.values.minutes < 0) {
                   that.values.minutes = 59;
                    --that.values.hours;
                }
                if(that.values.days >= 0 && that.values.hours < 0) {
                    that.values.hours =24;
                    --that.values.days;
                    } 
                
                // Update DOM values
                //Days
                that.checkDay(that.values.days, $day_1, $day_2,$day_3);
                // Hours
                that.checkHour(that.values.hours, $hour_1, $hour_2);

                // Minutes
                that.checkHour(that.values.minutes, $min_1, $min_2);

                --that.total_minutes;
                
                }
                else {

                clearInterval(that.countdown_interval);
                
                
              
                    }
                }, 60000);  
            
        },
        
animateFigure: function($el, value) {
  
  var that         = this,
          $top         = $el.find('.top'),
      $bottom      = $el.find('.bottom'),
      $back_top    = $el.find('.top-back'),
      $back_bottom = $el.find('.bottom-back');

 // Before we begin, change the back value
 $back_top.find('span').html(value);

 // Also change the back bottom value
 $back_bottom.find('span').html(value);

 // Then animate
 TweenMax.to($top, 0.8, {
     rotationX           : '-180deg',
     transformPerspective: 300,
     ease                : Quart.easeOut,
     onComplete          : function() {

         $top.html(value);

         $bottom.html(value);

         TweenMax.set($top, { rotationX: 0 });
     }
 });

 TweenMax.to($back_top, 0.8, { 
     rotationX           : 0,
     transformPerspective: 300,
       ease                : Quart.easeOut, 
     clearProps          : 'all' 
 });    
},
checkHour: function(value, $el_1, $el_2) {
  
  var val_1       = value.toString().charAt(0),
      val_2       = value.toString().charAt(1),
      fig_1_value = $el_1.find('.top').html(),
      fig_2_value = $el_2.find('.top').html();
      

  if(value >= 10) {

      // Animate only if the figure has changed
      if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
      if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      
  }
  else {

      // If we are under 10, replace first figure with 0
      if(fig_1_value !== '0') this.animateFigure($el_1, 0);
      if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
  }    
},


checkDay: function(value, $el_1, $el_2, $el_3) {
  
 
  var val_1       = value.toString().charAt(0),
      val_2       = value.toString().charAt(1),
      val_3       = value.toString().charAt(2),
      fig_1_value = $el_1.find('.top').html(),
      fig_2_value = $el_2.find('.top').html(),
      fig_3_value = $el_3.find('.top').html();

  if(value >= 10) {

      // Animate only if the figure has changed
      if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
      if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      if(fig_3_value !== val_3) this.animateFigure($el_3, val_3);
  }
  else {

      // If we are under 10, replace first figure with 0
      if(fig_1_value !== '0') this.animateFigure($el_1, 0);
      if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
  }    
}

    };
    // Let's go !
Countdown.init();
}



}