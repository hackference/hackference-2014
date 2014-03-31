$(document).ready(function() {
    /* Nav stuff */
    // Stick the #nav to the top of the window
    var nav = $('header nav');
    var navHomeY = nav.offset().top;
    var isFixed = false;
    var $w = $(window);
    $w.scroll(function() {
        var scrollTop = $w.scrollTop();
        var shouldBeFixed = scrollTop > navHomeY;
        if (shouldBeFixed && !isFixed) {
            nav.css({
                position: 'fixed',
                top: 0,
                left: nav.offset().left,
                width: nav.width()
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            nav.css({
                position: 'static'
            });
            isFixed = false;
        }
    });
    /* Speaker Flip */
    $('.flipper .front').on('click',function(){
        $(this).parent().mouseenter();
    });
    $('.flipper .back').on('click',function(){
        $(this).parent().mouseleave();
    });
    /* Accordion */
    $('#accordion').accordion({
        heightStyle: "content"
    });
    /* Sponsor */
    $('h3'+location.hash).click();
});