// ISTOPE FILTER  --------------

jQuery(document).ready(function ($) {
    // SELECT METHOD -----------------------
    var wrapper = $('#iso-grid');

    wrapper.imagesLoaded(function () {
        var filter = $('#filter-iso');
        var $container = $('#iso-grid').isotope({
            itemSelector: '.post',
            layoutMode: 'masonry'
        });

        // filter functions
        var filterFns = {
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt( number, 10 ) > 50;
            }
        };

        filter.on( 'change', function() {
            var filterValue = this.value;

            // change value window.location if it's an url
            if ($(this).find(':selected').data('url') == true) {
                window.location = filterValue;
            } else {
                filterValue = filterFns[ filterValue ] || filterValue;
                $container.isotope({
                    filter: filterValue
                });
            }

        });
        filter.change();
    });
});




// VIA UL LI MENU

/*
(function(){
  "use strict";

        
    $(function ($) {
          $(window).load(function(){
          
              var $container = $('#iso-grid');

              $container.isotope({
                  itemSelector: '.post',
                  layoutMode: 'masonry'
              });

             $('.filter-menu ul a').click(function(){
                  $('.filter-menu ul .current').removeClass('current');
                  $(this).addClass('current');
           
                  var selector = $(this).attr('data-filter');
                  $container.isotope({
                      filter: selector,
                   });
                   return false;
              });


              // window resize and layout regenerate
              $(window).resize(function() {
                   $container.isotope({
                      itemSelector: '.post',
                      layoutMode: 'masonry'
                  });
              });
                
          });  
    });

})();
*/





  

