/*MasterSlider OPTION CUSTOMISABLE*/
jQuery(document).ready(function ($) {
    $('#block-homesliderblock').css('height', '100%').parent().css('height', '100%');

    var slider = new MasterSlider();
    slider.setup('masterslider' , {
        width:2550,    // slider standard width
        height:1080,   // slider standard height
        space:false,
        mouse:false,
        //speed:10,
        autoplay:true,
        fullwidth:true,
        fullheight:true,
        /*autoHeight:true,*/
        loop: true,
        overPause:false,
        view:"fade"
    });
    // add scroll parallax effect
    MSScrollParallax.setup(slider,50,80,true); //IE9 il faut mettre smooth scrool ou supprimer le paramètre
    // adds Arrows navigation control to the slider.
    //slider.control('arrows', { autohide: false });
    slider.control('bullets', { autohide: false, dir:"v", align:"right"});

    // SLIDER HOMEPAGE ZOOM EFFECT ----------------------
    slider.api.addEventListener(MSSliderEvent.CHANGE_START , function(){

        var $this = slider.api.view.currentSlide.$element[0];
        $this.classList.add("zoom-slider");

    });
    slider.api.addEventListener(MSSliderEvent.CHANGE_END , function(){
        // dispatches when the slider's current slide change ends.

        var list = slider.api.view.slideList;

        for (i = 0; i < slider.api.view.slidesCount; i++) {
            if(i !== slider.api.index()) {
                list[i].$element[0].classList.remove("zoom-slider");
            }
        }
    });
});