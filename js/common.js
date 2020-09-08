/* sticky header */
$(window).scroll(function () {
    if ($(window).scrollTop() >= 10) {
        $("#header").addClass("fixed");
    } else {
        $("#header").removeClass("fixed");
    }
});

/* fold the hamburger menu clicking other than the menu in mobile */
$("body").click(function (e) {
    if (!$(".navbar-nav").has(e.target).length) {
        $("#navbarNav").removeClass("show");
    }
});