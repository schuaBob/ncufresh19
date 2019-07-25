$(document).ready(() => {
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
    });
    $("#topHref").click(function () {
        $.fn.fullpage.moveTo("indexPage");
    });
    $('.pernews').click((e)=>{
        $.ajax({
            url:`/schedule/read?pk=${e.currentTarget.attributes.pk.value}`,
            method:'GET',
            dataType:'JSON',
            error:(err)=>{
                console.log(err)
            },
            success:(res)=>{
                
            }
        })
    })
})
