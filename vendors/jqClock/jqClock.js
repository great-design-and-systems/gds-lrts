$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());

setInterval( function() {
  // Create a newDate() object and extract the seconds of the current time on the visitor's
  var seconds = new Date().getSeconds();
  // Add a leading zero to seconds value
  $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
  },1000);
  
setInterval( function() {
  // Create a newDate() object and extract the minutes of the current time on the visitor's
  var minutes = new Date().getMinutes();
  // Add a leading zero to the minutes value
  $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
  
setInterval( function() {
  // Create a newDate() object and extract the hours of the current time on the visitor's
  var hours = new Date().getHours();
  var meridiem;

  if(hours > 13){
    meridiem = 'PM';
    hours = hours - 12;
  } else {
    meridiem = 'AM';
  }
  // Add a leading zero to the hours value
  $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
  $('#meridiem').html(meridiem);

  // Output the day, date, month and year   
  $('#Date').html(dayNames[newDate.getDay()] + ", " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ', '  + newDate.getFullYear());
  
  }, 1000);
  
  // var setContentHeight = function(){ 
  //   setTimeout(function(){ 
  //     var mainHeight = $('main-frame').css('height').replace(/[^-\d\.]/g, '');
  //     var totalHeight = mainHeight * 0.165;
  //     var contentHeight = mainHeight - totalHeight;

  //     $('.mf-wrap > md-content').css('height', contentHeight);

  //   }, 500);
  // }
  // setContentHeight();
  // $('body').on('click','navigation-links .md-button', setContentHeight);
});