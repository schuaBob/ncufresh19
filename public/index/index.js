$(document).ready(() => {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage']
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);


    ClassicEditor
        .create(document.querySelector('#editor'),{
            extraPlugins:[ckuploadAdapter]
        })
        .then(editor => {
            console.log(editor);
        })
        .catch(error => {
            console.error(error);
        });
})
