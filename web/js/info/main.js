var vadSession = new VADSession();

$( function() {
  // set the giveto base URL
  var giveToLink = "https://giving.ucla.edu/Campaign/Donate.aspx?SiteNum=1&fund=63227O";
  // grab button references
  var $checkInButton = $('#btn-check-in'),
      $openSupportChatButton = $('#btn-support-chat'),
      $givingButton = $('#btn-giving');

  // set button copy accordingly
  if (vadSession.isAlreadyCheckedIn()) {
   $checkInButton.text('Sign Out');
  } else {
   $checkInButton.text($checkInButton.attr('value'));
  }

  // bind event listeners
  // giving button
  $givingButton.on('click', function() {
    window.location = giveToLink + ((vadSession.isAlreadyCheckedIn())? '&ID=' + vadSession.getValue('crmId') + '&LName=' + vadSession.getValue('lastName') : '');
  });

  /*
  for log out, clear out cookie and redirect to home page
  for check in, redirect to app.alumniday.ucla.edu
  publicid: publicid=2d6afa0d-473f-4329-affa-44544d6ec5b6
  */
  // check in / log out button
  $checkInButton.on('click', function() {
    if (vadSession.isAlreadyCheckedIn()) {
      // log out

      vadSession.removeSingleKeyValueCookie('publicID');
      vadSession.removeSingleKeyValueCookie('crmId');
      vadSession.removeSingleKeyValueCookie('lastName');
      vadSession.removeSingleKeyValueCookie('firstName');
      vadSession.removeSingleKeyValueCookie('securityToken');

      $(this).text($checkInButton.attr('value'));

    } else {
      $(this).attr('disabled',true);
      // redirect
      window.location = 'http://app.alumniday.ucla.edu';
    }
  });

  // support chat button
  $openSupportChatButton.on('click', function() {
    console.log('open chat support button clicked');
  });
});
