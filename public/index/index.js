
$(document).ready(() => {
    var editor;
    $('#fullpage').fullpage({
        anchors: ['indexPage', 'newsPage', 'callenderPage'],
        slideSelector: '.fpslide',
        scrollOverflow: true
    });
    $.fn.fullpage.setAllowScrolling(true)
    $.fn.fullpage.setRecordHistory(false);
    $('#newsModal').on('show.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(false)
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(neweditor => {
                console.log(neweditor);
                editor = neweditor;
            })
            .catch(error => {
                console.error(error);
            });
    })
    $('#newsModal').on('hide.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(true)
        editor.destroy()
            .catch(error => {
                console.log(error);
            });

    })


})
