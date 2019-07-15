
$(document).ready(() => {
    var editor;
    $('#fullpage').fullpage({
        anchors: ['indexPage', 'newsPage', 'callenderPage'],
        slideSelector: '.fpslide',
        scrollOverflow: true
    });
    
    $.fn.fullpage.setRecordHistory(false);
    $('#newsModal').on('show.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(false)
    })
    $('#newsModal').on('hide.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(true)

    })


})
