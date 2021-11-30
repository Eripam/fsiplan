var widthConst = 0;


jQuery(window).on('load', function () {
    jQuery('#status').addClass("showlogo");
    jQuery('.bar').delay(800).addClass("loaded80");
    jQuery('#status').delay(1000).fadeOut();
    jQuery('#preloader').delay(1200).fadeOut('slow');
    jQuery('.bar').addClass("loaded100");
});


jQuery(document).on('swipeleft', '.overlapblackbg', function (e) {
    jQuery('.wsmenucontainer').toggleClass('wsoffcanvasopener');
    jQuery(".modal-trigger").toggleClass("opacity");
});



// DOCUMENT READY -------------------------------------------------

jQuery(document).ready(function ($) {
    widthConst = 2 * ($('.headerfull').outerWidth(true) - $('.headerfull').innerWidth());
    /* init Jarallax ---------------- */
    jarallax(document.querySelectorAll('.parallax'), {
        imgWidth: 1920,
        imgHeight: 1080
    });

    if (!getCookie('fnLegal')) {
        var legal_banner = $('#legal-banner');
        legal_banner.removeClass('hidden');

        $(document).on('click', '#legal-accept', function (e) {
            e.preventDefault();
            setCookie('fnLegal', true, 7);
            legal_banner.fadeOut('slow');
            cookieDisc();
        });
    } else {
        cookieDisc();
    }

    $("a.anchor").anchorAnimate();

    /*$('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });*/

    var $topbarHeight = $(".topbar").innerHeight();
    var $bottombarHeight = $(".bottom-line").innerHeight();

    /*$(".header").css("height", window.innerHeight - $topbarHeight + "px");*/
    $(".header").css("height", $(window).innerHeight() - $topbarHeight + "px");
    $(".top-modal").css("width", (jQuery(window).width() > 1008) ? jQuery('.headerfull').innerWidth() : jQuery('.headerfull').innerWidth() + widthConst);

    $('#block-classes-tabs ul.tab-content li.tab-pane').each(function () {
        $(this).attr('id', $(this).children(':first').attr('id'));
        $(this).children(':first').removeAttr('id')
    });


    $(".panel-overlay").click(function () {
        $(this).removeClass("appear");
        $(".panel-slide").removeClass("appear");
    });

    /* TOGGLE mb-show topnav ----------- */
    $(".topnav-trigger").click(function () {
        $(".topnav").toggleClass("appear");
    });


    // accordion ---------------------------------
    $('.accordion .inner').hide();
    $('.accordion h3:first').addClass('opened').next().show();

    $('.accordion h3').click(function () {
        if ($(this).next().is(':hidden')) {
            $('.accordion h3').removeClass('opened').next().slideUp();
            $(this).toggleClass('opened').next().slideDown();
        }
        return false;
    });

    // LINK ACTIVE  -------------------------------
    var current = location.pathname;
    $('.wsmenu-list li a, .pagenav a').each(function () {
        var $this = $(this);
        if ($this.attr('href') === current) {
            $this.addClass('active');
        }
    });


    // TABS SCROLL TO SECTION ----------------------------
    $('#myTab a').on('click', function (e) {
        var anchor = $(this).attr('href');

        window.location.hash = anchor
        e.preventDefault();

        //console.log(anchor, $(anchor).offset().top);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: $('#tab-container').offset().top - 100}, 1000, function () {
        });
    });


    // BACK-TOP  ----------------------------
    $("#back-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    // BACK-TOP KEYPRESS ----------------------------
    $('body').keypress(function (evt) {
        if (evt.keyCode == 38) { // up arrow
            evt.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        }
    });


    // HOVER ----------------------------------------

    var selectFormGroup = function (event) {
        //event.preventDefault();

        var $selectGroup = $(this).closest('.input-group-select');
        var param = $(this).attr("href").replace("#", "");
        var prefix = $(this).text();

        $selectGroup.find('.prefix').text(prefix);
        $selectGroup.find('.input-group-select-val').val(param);

    };

    var countFormGroup = function ($form) {
        return $form.find('.form-group').length;
    };

    $(document).on('click', '.dropdown-menu a', selectFormGroup);

    // HEADER STICKY SCROLL NAV ------------------------------------------------
    if (window.innerWidth > 1024) {

        $(window).scroll(function (event) {
            var y = $(this).scrollTop();

            if (y >= 200) {
                $('.scrollnav').addClass('fixed');
                //console.log('ok');
            } else {
                $('.scrollnav').removeClass('fixed');
            }
        });
    }


    var hash = document.location.hash;
    if (hash && $('.nav-tabs li a[href="' + hash + '"]').length) {
        parent.location.hash = '';
        jQuery('.nav-tabs a[href="' + hash + '"]').tab('show');
        jQuery("html,body").animate({scrollTop: $('.nav-tabs li a[href="' + hash + '"]').offset().top}, 1000);
    }

    // Drupal debug
    $('#block-fnherstal-content').parent().css('overflow', 'hidden');

    // ODD-EVEN 2cols class ---------------------------------
    $( ".prodcat-list .cat-item:odd" ).addClass("odd");

    // CHECK HREF

    $('.prodcat-list a').each(function () {
        var $this = $(this);

        if (!$this.is('[href]')) {
            $this.css('cursor', 'default');
        }
    });

    //STOP!!---------------------------------------------------------------------------------------------
    //ALL CODE MUST BE PLACE BEFORE THIS LINE!!----------------------------------------------------------
    //DO NOT ADD CODE AFTER THIS LINE!!------------------------------------------------------------------

    // replace Trademark ( !!keep at the end of doc.ready!! )
    $("p,h1,h2,h3,h4,h5,th,td,li").each(function(){
        $(this).html($(this).html().replace(/&reg;/gi, '<sup>&reg;</sup>').replace(/®/gi, '<sup>&reg;</sup>'));
    });

});
// end/ doc.ready



jQuery.fn.anchorAnimate = function (settings) {

    settings = jQuery.extend({
        speed: 1000
    }, settings);

    return this.each(function () {
        var caller = this;
        jQuery(caller).click(function (event) {
            event.preventDefault();
            var locationHref = window.location.href;
            var elementClick = jQuery(caller).attr("href");

            var destination = jQuery(elementClick).offset().top;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, settings.speed);
            return false;
        })
    })
};

/* FIXED TITLE SCROLL _ ADDCLASS ------------------------------------ */
jQuery(window).scroll(function () {
    MenuScroll();

    var scroll = jQuery(window).scrollTop(),
        newsDetail = jQuery('.news-detail'),
        halfw2 = jQuery('.halfw-2');

    if (newsDetail.length > 0 && window.matchMedia("(min-width: 1200px)").matches) {
        if (scroll >= (newsDetail.offset().top - 200) && scroll <= newsDetail.offset().top + newsDetail.outerHeight()) {
            halfw2.addClass('fixed');
        } else {
            halfw2.removeClass('fixed');
        }
    } else if(newsDetail.length > 0 && window.matchMedia("(min-width: 990px) and (max-width: 1200px)").matches) {
        if (scroll >= (newsDetail.offset().top - 100) && scroll <= newsDetail.offset().top + newsDetail.outerHeight()) {
            halfw2.addClass('fixed');
        } else {
            halfw2.removeClass('fixed');
        }
    }

});

jQuery(window).resize(function ($) {
    var $topbarHeight = jQuery(".topbar").innerHeight();
    var $bottombarHeight = jQuery(".bottom-line").innerHeight();

    jQuery(".header").css("height", window.innerHeight - $topbarHeight + "px");
});

function MenuScroll() {

    if (jQuery(window).scrollTop() >= 220) {
        jQuery('.brand-logo, .alt-logo').addClass('scrolled');
        jQuery('.hamburger-inner').addClass('scrolled');
        jQuery(".topbar .dropdown-toggle").addClass("scrolled");
        jQuery(".language-container").addClass("scrolled");
    }
    else {
        jQuery('.brand-logo, .alt-logo').removeClass('scrolled');
        jQuery('.hamburger-inner').removeClass('scrolled');
        jQuery(".topbar .dropdown-toggle").removeClass("scrolled");
        jQuery(".language-container").removeClass("scrolled");
    }

}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// VIDEO FN HERSTAL - BASIC CONTENT ---
var $video = jQuery(".video"), //jquery-wrapped video element
    mousedown = false;

$video.click(function(){
    if (this.paused) {
        this.play();
        return false;
    }
    return true;
});

$video.on('mousedown', function () {
    mousedown = true;
});

jQuery(window).on('mouseup', function () {
    mousedown = false;
});

$video.on('play', function () {
    $video.attr('controls', '');
    jQuery('.player-icon').fadeOut();
});

$video.on('pause', function () {
    if (!mousedown) {
        $video.removeAttr('controls');
    }
    jQuery('.player-icon').fadeIn();
});

function cookieDisc(){
    if (!getCookie('fnDisc')) {
        var cookie_bar = jQuery('#fn-cookie-bar');
        cookie_bar.removeClass('hidden');

        jQuery(document).on('click', '.acceptDisc', function (e) {
            e.preventDefault();
            setCookie('fnDisc', true, 7);
            cookie_bar.fadeOut('slow');
        });
    }
}