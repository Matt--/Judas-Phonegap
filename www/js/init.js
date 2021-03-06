

// GPS successfully occured function
var onSuccess = function(location) {
  
  var jsonUrl = "http://judas.herokuapp.com/pestspotted";

  // Post packet to sever
  $.ajax({
    type: "POST",
    url: jsonUrl,
    data: 
				{"packet": {"position": {"longitude": "22", "latitude": "44", "accuracy": "0.5", "timestamp": "15 May"}, "auth": {"uid": "Matt", "accessToken": "possum"}}}


//{ "position" : { "latitude" : location.coords.latitude, "longitude" : location.coords.longitude, 
//                  "accuracy" : location.coords.accuracy, "timestamp" : location.coords.timestamp },
//            "auth": {"uid" : window.sessionStorage.userID , "accessToken" : window.sessionStorage.accessToken},
//            "pest": window.sessionStorage.currentPest},
    dataType: "json",
    success: function(data, textStatus, jqHXR){
      $.mobile.loading("hide");
      alert("status: " + textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown){
      $.mobile.loading("hide");
      alert(JSON.stringify(jqXHR) + "error: " + errorThrown + "status: "+ textStatus);
    }
  });
/*
  $.get(jsonUrl, function(data, status) {
    alert("Status:"+ status);
  }, 'json');*/
};

// onError Callback receives a PositionError object
function onError(error) {
  alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  $.mobile.loading("hide");
};

function bindlogin(){
  //Facebook login button, redirects to #mainpage if connected
  $(".FB-login").on("click", function(){
    FB.login(function(response) {
        if (response.status === 'connected') {
            window.localStorage.userID = response.authResponse.userID;
            $.mobile.changePage($("#mainpage"));
        } else {
            alert('Unable to login');
        }
    },{ scope: "email" });
  });
};

function bindloginmenu(){
  $(".FB-loginmenu").on("click", function(){
    $.mobile.changePage($("#login"));
  }); 
};

function bindlogout(){
  //Facebook logout button, redirects to #login screen
  $(".FB-logout").on("click", function(){
    FB.logout(function(response){
      $.mobile.changePage($("#login"));
    });
  });
};

function bindmenupest(){
  $(".menu-pest-button").on("click", function(){
    $.mobile.changePage($("#pestpage"));
  }); 
};

function bindreportpage(){
  //Slider button to report page, checks person is logged into Facebook
  $(".report-button").on("click", function(){
    $.mobile.changePage($("#mainpage"));
  });
};

function bindswipe(){
  
  // Swipe function for report page
  $( document ).on( "swipeleft swiperight", ".main-swipe-wrapper", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
          if ( e.type === "swiperight"  ) {
              $( "#report-panel" ).panel( "open" );
          }
        } else {
          if ( e.type === "swipeleft"  ) {
              $( "#report-panel" ).panel( "close" );
          }
        }
    });

  // Swipe function for login page
  $( document ).on( "swipeleft swiperight", "#login", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
          if ( e.type === "swiperight"  ) {
              $( "#login-panel" ).panel( "open" );
          }
        } else {
          if ( e.type === "swipeleft"  ) {
              $( "#login-panel" ).panel( "close" );
          }
        }
    });

  // Swipe function for pest page
  $( document ).on( "swipeleft swiperight", "#pestpage", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
          if ( e.type === "swiperight"  ) {
              $( "#pest-panel" ).panel( "open" );
          }
        } else {
          if ( e.type === "swipeleft"  ) {
              $( "#pest-panel" ).panel( "close" );
          }
        }
    });
};

function initCarousel(){
  $('.carousel-pest').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      touchMove: true,
      arrows: false
    });
};


function bindsendreport(){
  //Button for reporting pests
  $( "#send-report" ).bind( "click", function(event, ui) {

    if (window.sessionStorage.currentPest === undefined){
      alert("Please select a pest before reporting");
    } else {
      //show loader
      $.mobile.loading( "show", {
        text: "Sending...",
        textVisible: true,
        theme: "a",
        html: ""
      });

      //Check user is logged into Facebook
      FB.getLoginStatus(function(response){
          if (response.status === 'connected') {
            window.sessionStorage.accessToken = response.authResponse.accessToken;

            // UID not returned in login check so make api call for email
            FB.api('/me?fields=email,id', function(response){
              window.sessionStorage.uid = response.email;
              window.sessionStorage.userID = response.id;
              if (response.id != undefined) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
              } else {
                alert("Email not returned");
              }
            });

          } else {
              alert("Not logged in");
              $.mobile.changePage($("#login"));
              $.mobile.loading("hide");
          }
      });
    }
    $('#popupDialog').popup('close');
  });
};

function bindexpandpestdiv(){
  //hide all pest info initially
    $('.collapse-pest-div').hide();

    $( '#btn-collapse-possum' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-possum').show({duration:400});
      window.sessionStorage.currentPest = "possum";
    });

    $( '#btn-collapse-other1' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other1').show({duration:400});
      window.sessionStorage.currentPest = "other1";
    });
    $( '#btn-collapse-other2' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other2').show({duration:400});
      window.sessionStorage.currentPest = "other2";
    });
    $( '#btn-collapse-other3' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other3').show({duration:400});
      window.sessionStorage.currentPest = "other3";
    });
    $( '#btn-collapse-other4' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other4').show({duration:400});
      window.sessionStorage.currentPest = "other4";
    });
    $( '#btn-collapse-other5' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other5').show({duration:400});
      window.sessionStorage.currentPest = "other5";
    });
};

function initbuttons(){
    $.ajaxSetup ({
      cache: false
    });
    bindlogin();
    bindlogout();
    bindreportpage();
    bindsendreport(); 
    bindloginmenu();
    bindswipe();
    bindmenupest();

    // Uncomment for production
    bindexpandpestdiv();
    initCarousel();
};

  
// deviceready event listener, loads FB connect and checks if signed in
if (typeof CDV === 'undefined') {
        alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
    }
if (typeof FB === 'undefined') {
    alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
}
     
document.addEventListener('deviceready', function() {

    $(document).on('pagecreate', function(){
      initbuttons();
      $.mobile.buttonMarkup.hoverdelay = 200;
      $.mobile.defaultPageTransition   = 'none';
    });

    try {
        // Initialise FB SDK with app id
        FB.init({
            appId: "628299267250368",
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });

        // check if user is already signed in, if so forward to report screen
        FB.getLoginStatus(function(response){
          if (response.status === 'connected') {
            $.mobile.changePage($("#mainpage"));
          }
        });

    } catch (e) {
        alert(e);
    }

}, false);

//include in device ready once debuging is done
$(document).ready(function(){

    //hide all pest info initially
    $('.collapse-pest-div').hide();

    $( '#btn-collapse-possum' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-possum').show({duration:400});
      window.sessionStorage.currentPest = "possum";
    });

    $( '#btn-collapse-other1' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other1').show({duration:400});
      window.sessionStorage.currentPest = "other1";
    });
    $( '#btn-collapse-other2' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other2').show({duration:400});
      window.sessionStorage.currentPest = "other2";
    });
    $( '#btn-collapse-other3' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other3').show({duration:400});
      window.sessionStorage.currentPest = "other3";
    });
    $( '#btn-collapse-other4' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other4').show({duration:400});
      window.sessionStorage.currentPest = "other4";
    });
    $( '#btn-collapse-other5' ).on('click',function() {
      $('.collapse-pest-div').hide({duration:200});
      $('#div-collapse-other5').show({duration:400});
      window.sessionStorage.currentPest = "other5";
    });

    $('.carousel-pest').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      touchMove: true,
      arrows: false
    });
});
