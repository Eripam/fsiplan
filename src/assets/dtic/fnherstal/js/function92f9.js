jQuery(document).ready(function($){
    $(window).on('load', function () {
        pointerMap($);
        pointerMapUK($);
    });

    accordeonMenu($);

    /* Animation MENU ------------------------- */
    $('.burger-menu').on('click', function(){
        var $container = $('.burger-menu,.container-menu');

        if ($container.hasClass('open-menu')) {
            
            $('.mobile-menu .block-hover ul').fadeOut();
            $container.removeClass('open-menu').addClass('close-menu');
            setTimeout(function(){
                $container.removeClass('close-menu');
                $('.mobile-menu .block-hover ul').fadeOut();
            }, 1300);
        } else {
            $container.removeClass('close-menu').addClass('open-menu');
            $(".circle-spinner-menu").toggleClass("effect-sonar");
        }
        $('.container-menu').toggleClass('bg-menu');

    });

    $('.mobile-menu .block-hover ul').fadeOut();
    $('.mobile-menu .block-hover h3').click(function () {
        if ($(this).next().is(':hidden')) {
            $('.mobile-menu .block-hover h3').next().css('opacity',1).slideUp(500).animate({opacity: 0},{queue:false,duration: 500});
            $(this).next().css('opacity', 0).slideDown(500).animate({opacity:1},{queue:false,duration: 500});
        }
        return false;
    });

    /*$('.burger-menu').on('click', function(){
        $('#page-content').toggleClass('pushout');
    });*/

    // TIME LINE - SCROLL SMOOTH SECTION PAGE -------------------------
    $('body').scrollspy({target: ".navbar", offset: 50});

    // Add smooth scrolling on all links inside the navbar
    $("#myNavbar a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }  // End if
    });
    var height = $('.date').innerHeight();
    $('.test').css({ 'height': 'calc(100% - ' + height+ 'px)' });


    /* --- TABS --- */
    $('#contact-container .tab').not(":first-child").hide();
    jQuery('#contact-container .tab-links .pointer-map').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');

        // Show/Hide Tabs 1
        //jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

        // Show/FADE TABS 2
        jQuery('.tabs ' + currentAttrValue).fadeIn(1500).siblings().hide();

        // Show/Hide Tabs 3
        //jQuery('.tabs ' + currentAttrValue).siblings().slideUp(1000);
        //jQuery('.tabs ' + currentAttrValue).delay(1000).slideDown(1000);

        // Show/Hide Tabs 4
        //jQuery('.tabs ' + currentAttrValue).slideDown(400).siblings().slideUp(400);

        // Change/remove current tab to active
        jQuery(this).addClass('active-pointer active').siblings().removeClass('active-pointer active');
        //Before -> jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });

});

window.onresize = function(event) {
  accordeonMenu();
  pointerMap();
  pointerMapUK();
};

function accordeonMenu(){
    // ADDCLASS MENU FOR MOBILE CONDITION ------------------ 
    if (jQuery(window).width() < 990) {
        jQuery(".block-img").addClass("mobile-menu");
    }
    else {
        jQuery(".block-img").removeClass("mobile-menu");
    }
};


// CONTACT ------------------------------------------------------ 


function pointerMap(){
    // ADDCLASS MENU FOR MOBILE CONDITION ------------------
    if (jQuery(window).width() < 600) {
        var totalWidth = jQuery('.maps-img-be').outerWidth(true);
        var height = jQuery('.maps-img-be').outerHeight(true);
        var width = jQuery('.maps-img-be').width();
        var margin = (totalWidth - width)/2;

        //Point 1 - BELGIUM
        var calcheight = (height/100)*33; //Point 1 - BELGIUM
        var calcwidth = (((width/100)*50)-margin);

        //Point 2 - MIDDLE EAST
        var calcheight2 = (height/100)*49;
        var calcwidth2 = (((width/100)*66)-margin);

        //Point 3 - ASIA
        var calcheight3 = (height/100)*64;
        var calcwidth3 = (((width/100)*84)-margin);

        //Point 4 - USA
        var calcheight4 = (height/100)*35;
        var calcwidth4 = (((width/100)*20)-margin);

        //Point 5 - FNH UK Ltd
        var calcheight5 = (height/100)*23;
        var calcwidth5 = (((width/100)*44)-margin);

        //Point 1
        jQuery('.pointer1-be').css('top',calcheight+'px');
        jQuery('.pointer1-be').css('left',calcwidth+'px');

        //Point 2
        jQuery('.pointer2-be').css('top',calcheight2+'px');
        jQuery('.pointer2-be').css('left',calcwidth2+'px');

        //Point 3
        jQuery('.pointer3-be').css('top',calcheight3+'px');
        jQuery('.pointer3-be').css('left',calcwidth3+'px');

        //Point 4
        jQuery('.pointer4-be').css('top',calcheight4+'px');
        jQuery('.pointer4-be').css('left',calcwidth4+'px');

        //Point 5
        jQuery('.pointer5-be').css('top',calcheight5+'px');
        jQuery('.pointer5-be').css('left',calcwidth5+'px');
    }
    else {
        var totalWidth = jQuery('.maps-img-be').outerWidth(true);
        var height = jQuery('.maps-img-be').outerHeight(true);
        var width = jQuery('.maps-img-be').width();
        var margin = (totalWidth - width)/2;

        //Point 1 - BELGIUM
        var calcheight = (height/100)*33; //Point 1 - BELGIUM
        var calcwidth = (((width/100)*50)-margin);

        //Point 2 - MIDDLE EAST
        var calcheight2 = (height/100)*52;
        var calcwidth2 = (((width/100)*67.5)-margin);

        //Point 3 - ASIA
        var calcheight3 = (height/100)*70;
        var calcwidth3 = (((width/100)*85.5)-margin);

        //Point 4 - USA
        var calcheight4 = (height/100)*42.5;
        var calcwidth4 = (((width/100)*22)-margin);

        //Point 5 - FNH UK Ltd
        var calcheight5 = (height/100)*28.5;
        var calcwidth5 = (((width/100)*47.2)-margin);

        //Point 1
        jQuery('.pointer1-be').css('top',calcheight+'px');
        jQuery('.pointer1-be').css('left',calcwidth+'px');

        //Point 2
        jQuery('.pointer2-be').css('top',calcheight2+'px');
        jQuery('.pointer2-be').css('left',calcwidth2+'px');

        //Point 3
        jQuery('.pointer3-be').css('top',calcheight3+'px');
        jQuery('.pointer3-be').css('left',calcwidth3+'px');

        //Point 4
        jQuery('.pointer4-be').css('top',calcheight4+'px');
        jQuery('.pointer4-be').css('left',calcwidth4+'px');

        //Point 5
        jQuery('.pointer5-be').css('top',calcheight5+'px');
        jQuery('.pointer5-be').css('left',calcwidth5+'px');
    }
};


function pointerMapUK(){
    // ADDCLASS MENU FOR MOBILE CONDITION ------------------
    if (jQuery(window).width() < 600) {
        var totalWidth = jQuery('.maps-img-uk').outerWidth(true);
        var height = jQuery('.maps-img-uk').outerHeight(true);
        var width = jQuery('.maps-img-uk').width();
        var margin = (totalWidth - width)/2;

        //Point 1 - FNH UK Ltd
        var calcheight = (height/100)*76.5;
        var calcwidth = (((width/100)*35)-margin);

        //Point 2 - BELGIUM
        var calcheight2 = (height/100)*82;
        var calcwidth2 = (((width/100)*52)-margin);

        //Point 3 - Operational Office
        var calcheight3 = (height/100)*75;
        var calcwidth3 = (((width/100)*40)-margin);


        //Point 1
        jQuery('.pointer1-uk').css('top',calcheight+'px');
        jQuery('.pointer1-uk').css('left',calcwidth+'px');

        //Point 2
        jQuery('.pointer2-uk').css('top',calcheight2+'px');
        jQuery('.pointer2-uk').css('left',calcwidth2+'px');

        //Point 3
        jQuery('.pointer3-uk').css('top',calcheight3+'px');
        jQuery('.pointer3-uk').css('left',calcwidth3+'px');
    }
    else {
        var totalWidth = jQuery('.maps-img-uk').outerWidth(true);
        var height = jQuery('.maps-img-uk').outerHeight(true);
        var width = jQuery('.maps-img-uk').width();
        var margin = (totalWidth - width)/2;

        //Point 1 - FNH UK Ltd
        var calcheight = (height/100)*42.5;
        var calcwidth = (((width/100)*36.2)-margin);

        //Point 2 - BELGIUM
        var calcheight2 = (height/100)*48.5; //Point 1 - BELGIUM
        var calcwidth2 = (((width/100)*53.5)-margin);

        //Point 3 - Operational Office
        var calcheight3 = (height/100)*41.5;
        var calcwidth3 = (((width/100)*39)-margin);

        //Point 1
        jQuery('.pointer1-uk').css('top',calcheight+'px');
        jQuery('.pointer1-uk').css('left',calcwidth+'px');

        //Point 1
        jQuery('.pointer2-uk').css('top',calcheight2+'px');
        jQuery('.pointer2-uk').css('left',calcwidth2+'px');

        //Point 3
        jQuery('.pointer3-uk').css('top',calcheight3+'px');
        jQuery('.pointer3-uk').css('left',calcwidth3+'px');
    }
};