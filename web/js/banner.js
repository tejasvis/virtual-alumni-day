$(document).ready(function () {
    
    var gridpad_top=parseInt($('.changedContainer').css('padding-top'));
console.log(gridpad_top);
var pad_top=$('.sticky-top').height();
console.log(pad_top);

var ban_height=$('#banner').height();
console.log(ban_height+pad_top);

var totalheader=ban_height+pad_top;

var ratio = window.devicePixelRatio || 1;
var w = screen.width ;

console.log(totalheader);

if(w <'768'){
    console.log("hey");
$(".close-banner").click(function(){
$("#banner").remove();
$('.changedContainer').css("padding-top", totalheader-'150');
 });

} 
 
else if(w > '767'&& w<'1278') {

$(".close-banner").click(function(){
$("#banner").remove();
$('.changedContainer').css("padding-top", totalheader-'60');
 });

}
else if(w > '1279' && w<'2001') {
    console.log("hello");
$(".close-banner").click(function(){
$("#banner").remove();
$('.changedContainer').css("padding-top", totalheader-'80');
    });
    }
    else if( w>'2000') {
       
$(".close-banner").click(function(){
$("#banner").remove();
$('.changedContainer').css("padding-top", totalheader-'100');
    });
    }
 
});