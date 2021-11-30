jQuery(document).ready(function($) {


    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });

	/* init Jarallax ---------------- */
    jarallax(document.querySelectorAll('.parallax'), {
        imgWidth: 1920,
        imgHeight: 1080
    });
}); // end-$doc.ready





/* init WOW ---------------- */
/*wow = new WOW(
	{
	  animateClass: 'animated',
	  offset:       100,
	  callback:     function(box) {
	    console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
	  }
	}
);
wow.init();*/
