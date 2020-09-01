 /* sticky header */
$(window).scroll(function(){ 
    if ($(window).scrollTop() >= 10) { 
        $('navbar').addClass('fixed'); 
    } else {
        $('navbar').removeClass('fixed'); 
    } 
});