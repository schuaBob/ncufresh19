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
    
    $(".day").each(function(){
        $(this).css("left", (this.id-1) * 10 + "%");
    });
 
});

$(".selectMonth").on("click", function(){
    $.ajax({
        url:    "calender_get_data",
        method: "POST",
        data:   { id: this.id },
        error: function(err){
            alert("Some error occur...");
        },
        success: function(data){
            $("#days").empty();
            var count = 0;
            for(var i in data){
                $("#days").append('<div class="day" id="' +  count + '"> <div class="dot"> <svg height="40" width="40"> <circle cx="20" cy="20" r="20" fill="#ec6d4f" /> </svg> </div> <div class="date">' + data[i].month + '/' + data[i].date + '</div> </div>');
                count = count + 1;
            }
            adjust();
        }
    });
});

$(".day").on("click", function(){

});

function adjust(){
    $(".day").each(function(){
        $(this).css("left", (this.id) * 10 + "%");
    });
}