$(document).ready(function(){
    var pad_top_val;
    if(screen.width >768){
    pad_top_val="85px";
    console.log("hey");
    $('.tagboard-embed').css('padding-top',pad_top_val);
    }
    else {
    pad_top_val="50px";
    console.log("hey");
    $('.tagboard-embed').css('padding-top',pad_top_val);
    }

});