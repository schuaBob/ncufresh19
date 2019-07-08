
$(document).ready(() => {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage'],
        slideSelector: '.fpslide',
        scrollOverflow:true
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);
})
