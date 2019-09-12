/*****
 * This js file handles login functionality on homepage
 * 1. -->Fetches the public id from url and validates against the CRM and places the cookie with crm id, firstanme and lastname along with public id
 * 2. -->Validated user from login page is handled with the cookie
 * 3. --> user not found / direct visit to the website shows User to Sign in
 */
var vadSession=new VADSession();
var fname = "firstName";
var pubId;
var homepageUrl= $(".container-fluid").data('hometype');
$( function() {


        var checkinText=$('.homepageCheckinUserName').data('checkintype');        
        var checkinTextline2=$('.homepageCheckinSubtitle').data('checkintypeline2');
       
 

        if(vadSession.isAlreadyCheckedIn()){
            // get VAD user's name & display it...
            
            $(".homepageCheckinUserName" ).text( "Hi " + vadSession.getValue( fname ) + "! " );
            $(".homepageCheckinUserName" ).css({"font-weight": "bold"});
            $(".homepageCheckinSubtitle" ).text( checkinTextline2 );
           // clearCookieFromloginApp();
        }

        else
        {
            var field='publicid';
          
            var url=window.location.href;                
            var returnPublicId=checkForQueryString(url,field);
           

            if (typeof returnPublicId !='undefined'){
                var jsonReqObj={"publicID":returnPublicId};
                $.ajax({
                                
                    url:"https://api.alumniday.ucla.edu/users/checkinviapublicid",
                    contentType: "application/json; charset=utf-8",
                    data:{'publicID':returnPublicId},
                    type:'GET',
                    success:function(jsonRespObj ){                                      
                        // store user info in session...
                        vadSession.setMultipleKeyValues( jsonRespObj );
                        vadSession.setSingleKeyValue('publicID',returnPublicId);
                   
                        $(".homepageCheckinUserName" ).text( "Hi " + vadSession.getValue( fname ) + "! " );
                        $(".homepageCheckinUserName" ).css({"font-weight": "bold"});
                        $(".homepageCheckinSubtitle" ).text(checkinTextline2 );

                       // clearCookieFromloginApp();
                       
                        /*** signing out of website and clearing the cookie */
                        /* $("a[href='https://stage.app.alumniday.ucla.edu']").attr('href', homepageUrl);
                                           
                          $(".ucla-stickyHeader-Checkin-Icon-Click").click(function(){                                              
                            vadSession.removeMultipleKeyValuesCookie(jsonRespObj);
                            if(vadSession.containsKey('publicID')){                                                   
                                vadSession.removeSingleKeyValueCookie('publicID',returnPublicId);
                            }

                            $( ".homepageCheckinUserName" ).text(checkinText ) ; 
                            $( ".homepageCheckinSubtitle" ).text(checkinTextline2 ) ; 
                        });   */
                        
                    },                                        
                    error: function (errorResponse) {// else, if user is NOT authenticated...
                     console.log("No user found");
                        window.location.replace(homepageUrl);
                        $( ".homepageCheckinUserName" ).text(checkinText ) ; 
                        $( ".homepageCheckinSubtitle" ).text(checkinTextline2 ) ;
                    }
            
                });
            }
            else{
                $( ".homepageCheckinUserName" ).text(checkinText) ;  
                $( ".homepageCheckinSubtitle" ).text(checkinTextline2 ) ;
                }

        }//END of is user is not checked in already
                
});     



/***
                 * Name: checkForQueryString()
                 * 
                 * This function checks for the existence of query string for the 
                 * personalized links and returns the public id
                 * 
                 * Returns: Either publicId or undefined if no id is found
                 */
                
                function checkForQueryString(url,field){               
                    
                    if(url.indexOf('?' + field + '=') != -1){
                        pubId=url.split("?")[1].split("=")[1];
                    
                        return pubId;                
                        }
                return pubId;
                    }/*End of querystring function*/
                
                
            /***
                 * Name: clearCookieFromloginApp()
                 * 
                 * This functionclears the cookie set from login app
                 * 
                 * Returns: None
                 */

          /*       function clearCookieFromloginApp(){
                    $("a[href='https://stage.app.alumniday.ucla.edu']").attr('href', homepageUrl);
                             $(".ucla-stickyHeader-Checkin-Icon-Click").click(function(){
                               

                                if(vadSession.containsKey('crmId') && vadSession.containsKey('firstName') && vadSession.containsKey('lastName')){
                                   
                                    vadSession.removeSingleKeyValueCookie('crmId');
                                    vadSession.removeSingleKeyValueCookie('firstName');
                                    vadSession.removeSingleKeyValueCookie('lastName');

                                }
                                 
                                 if(vadSession.containsKey('publicID')){
                                
                                 vadSession.removeSingleKeyValueCookie('publicID');
                                   }
                                 $( ".homepageCheckinUserName" ).text(checkinText ) ; 
                                 $( ".homepageCheckinSubtitle" ).text(checkinTextline2 ) ;
                                }); 
                }
 */