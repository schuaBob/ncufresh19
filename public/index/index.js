
$(document).ready(() => {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage'],
        slideSelector: '.fpslide',
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);
})
