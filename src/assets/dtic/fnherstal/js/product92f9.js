(function($, Drupal) {
    var nbPosts = 3;
    var nbPostsTablet = 2;
    var nbPostsMobile = 1;
    var loop = true;

    var owl = $('.owl-carousel');
    var relatedProducts = owl.find('.post');

    if (relatedProducts.length < 3){
        loop = false;
    }

    owl.owlCarousel({
        margin: 40,
        nav:true,
        loop: loop,
        dots: false,
        responsive: {
            0: {
                items: nbPostsMobile
            },
            800: {
                items: nbPostsTablet
            },
            1200: {
                items: nbPosts
            }
        }
    });
    $( ".owl-prev").html('<i class="ti-arrow-left"></i>');
    $( ".owl-next").html('<i class="ti-arrow-right"></i>');

    //  VIDEO --------------------
    var $video = $(".video");
    var mousedown = false;

    $video.fitVids();

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

    $(window).on('mouseup', function () {
        mousedown = false;
    });

    $video.on('play', function () {
        $video.attr('controls', '');
        $('.player-icon').fadeOut();
    });

    $video.on('pause', function () {
        if (!mousedown) {
            $video.removeAttr('controls');
        }
        $('.player-icon').fadeIn();
    });

})(jQuery, Drupal);

jQuery(document).ready(function() {
    var showChar = 1110;
    // Set maxWidth to apply ratio for special cases
    var maxWidth = false;
    textLimit();

    function textLimit() {
        if (window.innerWidth <= 600) {
            showChar = 360;
        } else if (window.innerWidth <= 800) {
            showChar = 400;

        } else if(window.innerWidth <= 1200){
            showChar = 295;
        } else if(window.innerWidth <= 1450){
            showChar = 720;
        } else{
            showChar = 1110;
            maxWidth = true;
        }
    }

    function htmlEncode(value){
        return jQuery('<div/>').text(value).html();
    }

    var ellipsestext = "...";
    var moretext = "See more";
    var lesstext = "See less";

    var ellipseObject = document.createElement('span');
    ellipseObject.innerHTML = ellipsestext;
    ellipseObject.classList.add("moreelipses");

    jQuery('.more').each(function() {
        var content = jQuery(this).html();
        var showCharLocal = showChar;

        if (maxWidth) {
            // Set apply ratio to character limit
            if (jQuery(this).data('limitratio')) {
                showCharLocal *= jQuery(this).data('limitratio');
            }
        }

        var contentText = striphtml(content);

        if(contentText.length > showChar) {
            var reducedText = html_substr(content, showCharLocal);
            var html = '<div class="lesscontent">' +
                reducedText +
                '<a class="btn more morelink">'+moretext+'</a>' +
                '</div>' +
                '<div class="morecontent" style="display:none">' +
                content +
                '<a class="btn more lesslink">' +
                lesstext +
                '</a>' +
                '</div>';
            jQuery(this).html(html);
        }

    });

    // Creates a substring only using text content and skipping html tags
    function html_substr( str, count ) {
        var div = document.createElement('div');
        div.innerHTML = str;

        walk( div, track );

        function track( el ) {
            if( count > 0 ) {
                var len = el.data.length;
                count -= len;
                if( count <= 0 ) {
                    el.data = el.substringData( 0, el.data.length + count );
                }
            } else {
                el.data = '';
            }
        }

        function walk( el, fn ) {
            var node = el.firstChild, oldNode;

            if (node) {
                do {
                    if( node.nodeType === 3 ) {
                        fn(node);
                    } else if( node.nodeType === 1 ) {
                        walk( node, fn );
                    }
                } while( (node = node.nextSibling) && (count>0));

                //remove remaining nodes
                while(node){
                    oldNode = node;
                    node = node.nextSibling;
                    el.removeChild(oldNode);
                }
            }
        }

        var lastChild = div.lastChild;
        lastChild.appendChild(ellipseObject);

        return div.innerHTML;
    }

    function striphtml (html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    }

    // Display full text
    jQuery(".morelink").click(function(){
        jQuery(this).parent().hide();
        jQuery(this).parent().next().fadeIn();
        return false;
    });

    jQuery(".lesslink").click(function(){
        jQuery(this).parent().hide();
        jQuery(this).parent().prev().show();
        jQuery('html, body').animate({
            scrollTop: jQuery(this).parent().prev().offset().top-25
        }, 0);
        return false;
    });

    //  FLEXSLIDER --------------------
    jQuery('.flexslider').flexslider({
        keyboard: true,
        animation: "fade",
        controlNav: true,
        directionNav: true,
        animationLoop: true,
        slideshow: true,
        slideshowSpeed:3000,
        touch: true
    });
});


//Youtube
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var $videoId = jQuery("#ytplayer").data("video");

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '744',
        width: '1324',
        frameBorder: '0',
        videoId: $videoId,
        playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque', 'rel':0 },
        events: {
            'onReady': onPlayerReady
        }
    });

    function onPlayerReady () {
        // IFRAME run after scroll
        jQuery(window).on('scroll',function() {

            if (checkVisible(jQuery('iframe'))) {
                player.playVideo();
                jQuery(window).off('scroll');
            } else {
                // do nothing
            }

        });

        function checkVisible( elm, eval ) {
            eval = eval || "object visible";
            var viewportHeight = jQuery(window).height(), // Viewport Height
                scrolltop = jQuery(window).scrollTop(), // Scroll Top
                y = jQuery(elm).offset().top,
                elementHeight = jQuery(elm).height();

            if (eval === "object visible") {
                return (y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight));
            }

            if (eval === "above") return ((y < (viewportHeight + scrolltop)));
        }
    }
}
