$(document).ready(function(){
  var timeleft = 3;
  var downloadTimer;
  var $Obj = $('#countdowntimerClock');
  var $btnMaps = $('<a class="btn btn-lg btn-outline-primary" href="" role="button" target="_blank"></a>');$
  // var btnMaps='<a class="btn googleEarthBtn" href="" role="button"  target="_blank"> </a>'; //Adding anchor
  var $title = $('#googleearthtitle');
  var width = $(window).width();

// if (screen && screen.width > 1279){
//     var timeleft = 3;
//     var downloadTimer = setInterval(function(){
//     timeleft--;
//     document.getElementById("countdowntimerClock").textContent = timeleft;
//     if(timeleft <= 0)
//     clearInterval(downloadTimer);
//     },1000);
//
//     setTimeout(function() {
//       var win=window.open("{{block.urlembed}}",'_blank');
//       if (win) {
//         win.focus();
//       }
//     }, 3000 /* time to delay */ );
//
// }

// configure markup
$btnMaps.attr('href', $Obj.data('url'));

// tablet+
if( width >= 768 ) {
    $btnMaps.text('Open Map In a New Tab');
    $Obj.find('.timer').text( timeleft );

    downloadTimer = setInterval(function(){
      timeleft--;

      if (timeleft <= 0) {
        clearInterval( downloadTimer );
        $Obj.html('');
        $Obj.append( $btnMaps );


      } else {
        $Obj.find('.timer').text( timeleft );
      }
    },1000);

    // for desktop automatically open tab
    if (width > 1279) {
      setTimeout( function() {
        var win = window.open($btnMaps.attr('href'),'_blank');
        if (win) {
          win.focus();
        }
      },3000);
    }

    /*
    android: https://play.google.com/store/apps/details?id=com.google.earth&hl=en
    ios: https://itunes.apple.com/us/app/google-earth/id293622097
    */

     //Adding anchor button for google earth
     //replacing span element

    // setTimeout(function() {
    //
    //     // if(Obj.outerHTML) { //if outerHTML is supported
    //     // Obj.outerHTML=btnMaps; ///it's simple replacement of whole element with contents of btnMaps var
    //     // }
    //     // else {
    //     // var tmpObj=document.createElement("div");
    //     // tmpObj.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
    //     // $ObjParent=$Obj.parent();
    //     // $ObjParent.replaceChild(tmpObj,Obj);
    //     // $ObjParent.html()=ObjParent.innerHTML.replace('<div><!--THIS DATA SHOULD BE REPLACED--></div>',btnMaps);
    //     // }
    //
    // }, 3000 /* time to delay */ );


// mobile
} else if ( width < 768) {
    // $btnMaps.text('Go to the Google Earth App');
    $btnMaps.hide();
    $title.text('The Travel Map is not optimized for mobile devices. Please visit Alumni Day on a computer to experience this activity.');

    $Obj.html('');
    $Obj.append( $btnMaps );
    // var divObj=document.getElementById('googleearthtitle');//replace div h2 object
    //
    //
    //     if(Obj.outerHTML && divObj.outerHTML) { //if outerHTML is supported
    //     Obj.outerHTML=btnMaps; ///it's simple replacement of whole element with contents of btnMaps var
    //     divObj.outerHTML=h2Maps;
    //     }
    //     else {
    //     var tmpObj=document.createElement("div");
    //     tmpObj.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
    //     ObjParent=Obj.parentNode;
    //     ObjParent=divObj.parentNode;
    //
    //     ObjParent.replaceChild(tmpObj,Obj);
    //     ObjParent.appendChild(tmpObj,divObj);
    //
    //
    //     ObjParent.innerHTML=ObjParent.innerHTML.replace('<div><!--THIS DATA SHOULD BE REPLACED--></div>',btnMaps);
    //
    //     ObjParent.innerHTML=ObjParent.innerHTML.append('<div><!--THIS DATA SHOULD BE REPLACED--></div>',h2Maps);
    //     }
}
});
