$(function() {
    if ($(window).width() < 922) {
        SidebarClose();
      } else {
        SidebarOpen();
      }

    $(window).on('resize', function(){
        if ($(window).width() < 922) {
            SidebarClose();

          } else {
            SidebarOpen();

          }
  });

  // $('.menu-icon-toggle').on('click', function(e) {
  //   $('body').toggleClass('open');
  //   $('.wrapper').toggleClass('show');
  //   e.preventDefault();
  // });


    $('#togglebutton').click(function() {
        SidebarCollapse();
    });

    $(".navBar-link").on("click", function(e) {
        // prevent default behaviour of the anchor tag
        e.preventDefault();
        $('.navBar-link')
          .removeClass("navBar-link--active");
        $(this).addClass("navBar-link--active");
        // save the data attribute for the anchor tag that was clicked
        var page = $(this).data("page");
        // find the current 'page' element that doesn't have the class .hide -- this is a css selector
        $(".page:not('.hide')")
          .stop()
          .fadeOut("fast", function() {
            // adds .hide to the element that was showing after it has faded out
            $(this).addClass("hide");
            // remove hidden class from element with the same data attribute as the anchor tag
            $('.page[data-page="' + page + '"]')
              .fadeIn("slow")
              .removeClass("hide");
          });
      });

    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=rj&api_key=888e5af3c9dc7cc5c6fee6dd1a6d2c62&format=json&limit=10",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            var data=res.topalbums.album;
      var output = "";
      $.each(data, function(key, val) {
        output += '<div class="album-card"> <a href="#"> <div class="img-area">';
        output +=
          ' <img class="album-image" src="'+val.image[3]["#text"]+'" alt="05" border="0">';
        output += '  </div>';
        output += '<div class="title-area"> <div class="album-title">' + val.name + '</div>';
        output +=
          '  </div>';
        output += " </a>";
        output += "</div>";
            });
            $("#albums-slide, #albums-slide_2, #albums-slide_3,#albums-slide_library,#albums-slide_library_2,#albums-slide_library_3").html(output);
            $('#albums-slide, #albums-slide_2,#albums-slide_3,#albums-slide_library,#albums-slide_library_2,#albums-slide_library_3').slider({
              slidesToShow: 4,
              slidesToScroll: 4,
              autoplay: false,
              arrows:false,
              centerMode:true,
              centerPadding: "60px",
              infinite: true,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    centerPadding: "40px",
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 1008,
                  settings: {
                    slidesToShow: 2,
                    centerPadding: "40px",
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                      slidesToShow: 1,
                      centerPadding: "10px",
                    slidesToScroll:1

                  }
                }
              ]
            });
        }
    });


    var $form_modal = $('.cd-user-modal'),
    $form_login = $form_modal.find('#cd-login'),
    $form_signup = $form_modal.find('#cd-signup'),
    $form_forgot_password = $form_modal.find('#cd-reset-password'),
    $form_modal_tab = $('.cd-switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
    $sign_in_button = $('.cd-signin');
    $sign_up_button = $('.cd-signup');

//open modal
$sign_up_button.on('click', function(event){
        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        signup_selected();

});
$sign_in_button.on('click', function(event){

        //show modal layer
        $form_modal.addClass('is-visible');
        //show the selected form
        login_selected();

});

//close modal
$('.cd-user-modal').on('click', function(event){
    if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
        $form_modal.removeClass('is-visible');
    }
});
//close modal when clicking the esc keyboard button
$(document).keyup(function(event){
    if(event.which=='27'){
        $form_modal.removeClass('is-visible');
    }
});

//switch from a tab to another
$form_modal_tab.on('click', function(event) {
    event.preventDefault();
    ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
});

//hide or show password
$('.hide-password').on('click', function(){
    var $this= $(this),
        $password_field = $this.prev('input');

    ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
    //focus and move cursor to the end of input field
});

//show forgot-password form
$forgot_password_link.on('click', function(event){
    event.preventDefault();
    forgot_password_selected();
});

//back to login from the forgot-password form
$back_to_login_link.on('click', function(event){
    event.preventDefault();
    login_selected();
});

function login_selected(){
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.addClass('selected');
    $tab_signup.removeClass('selected');
}

function signup_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
    $tab_signup.addClass('selected');
}

function forgot_password_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.addClass('is-selected');
}

//REMOVE THIS - it's just to show error messages
$form_login.find('input[type="submit"]').on('click', function(event){
    event.preventDefault();
    $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
});
$form_signup.find('input[type="submit"]').on('click', function(event){
    event.preventDefault();
    $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
});



    });


   function SidebarClose(){
    $(".Root__nav-bar").addClass("Root__nav-bar-min");
    $(".SearchInputBox").addClass("SearchInputBox-min");
    $(".navbar_footer_buttons").addClass("hidden");
    $(".navbar_footer_buttons-min").removeClass("hidden");
    $(".spotify-logo--text-min").removeClass("hidden");
    $(".spotify-logo--text").addClass("hidden");

// Collapse/Expand icon
$('#collapse-icon').removeClass('spoticon-skip-back-16');
$('#collapse-icon').addClass('spoticon-skip-forward-16');
   }
   function SidebarOpen(){
    $(".Root__nav-bar").removeClass("Root__nav-bar-min");
    $(".SearchInputBox").removeClass("SearchInputBox-min");
    $(".navbar_footer_buttons").removeClass("hidden");
    $(".navbar_footer_buttons-min").addClass("hidden");
    $(".spotify-logo--text-min").addClass("hidden");
    $(".spotify-logo--text").removeClass("hidden");

// Collapse/Expand icon
$('#collapse-icon').addClass('spoticon-skip-back-16');
$('#collapse-icon').removeClass('spoticon-skip-forward-16');
   }


    function SidebarCollapse () {
            $(".Root__nav-bar").toggleClass("Root__nav-bar-min");
            $(".SearchInputBox").toggleClass("SearchInputBox-min");
            $(".navbar_footer_buttons").toggleClass("hidden");
            $(".navbar_footer_buttons-min").toggleClass("hidden");
            $(".spotify-logo--text-min").toggleClass("hidden");
            $(".spotify-logo--text").toggleClass("hidden");

        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('spoticon-skip-back-16 spoticon-skip-forward-16');
    }


    $('#carouselExample').on('slide.bs.carousel', function (e) {

      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 4;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems-(itemsPerSlide-1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i=0; i<it; i++) {
              // append slides to end
              if (e.direction=="left") {
                  $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                  $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
          }
      }
  });
