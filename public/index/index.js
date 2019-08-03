var current_calender;
var nowLeft = 10;

$(document).ready(() => {
    $('#fullpage').fullpage({
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        anchors: ['indexPage', 'newsPage', 'callenderPage'],
        slideSelector: '.fpslide',
        scrollOverflow: true,
        normalScrollElements: '#news-body, #board-detail',
        afterLoad: function (anchorLink, index) {
            if (index.index === 0)
                $("#topHref").css("display", "none");
            else if (index.index === 1)
                $("#topHref").css("display", "inline");
            else
                $("#topHref").css("display", "inline");
        }
    });

    $.fn.fullpage.setRecordHistory(false);
    $('#newsModal').on('show.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(false)
    })
    $('#newsModal').on('hide.bs.modal', () => {
        $.fn.fullpage.setMouseWheelScrolling(true)
        $('.cateTitle').empty();
        $('.cateIcon').empty();
        $('#newsdetail').empty();
    });
    $("#topHref").click(function () {
        $.fn.fullpage.moveTo("indexPage");
    });
    $('.pernews').click((e) => {
        $.ajax({
            url: `/schedule/read?pk=${e.currentTarget.attributes.pk.value}`,
            method: 'GET',
            dataType: 'JSON',
            error: (err) => {
                console.log(err)
            },
            success: (res) => {
                $('.cateTitle').html(`<h3>${res.title}</h3>`);
                var catePicArr = ["重要通知", "學校活動", "課業相關", "生活日常", "網站問題", "學生組織"];
                $('.cateIcon').html(`<img src="index/icon-${catePicArr[res.category - 1]}.png" class="card-img">`);
                $('#newsdetail').html(res.content);
            }
        })
    });
})

$(".day").each(function () {
    $(this).css("left", (this.id - 1) * 10 + "%");

    $.ajax({
        url: "calender_get_data",
        method: "POST",
        data: { id: "aug" },
        error: function (err) {
            alert("Some error occur...");
        },
        success: function (data) {
            append_circle(data);
        }
    });
});



$(".selectMonth").on("click", function () {
    $.ajax({
        url: "calender_get_data",
        method: "POST",
        data: { id: this.id },
        error: function (err) {
            alert("Some error occur...");
        },
        success: function (data) {
            append_circle(data);
        }
    });
});

function append_circle(data) {
    $("#days").empty();
    $("#days").append('<a class="prev">&#10094;</a><a class="next">&#10095;</a>');
    $("#days").append('<div id="scrollDay"></div>');
    var count = 0;
    for (var i in data) {
        $("#scrollDay").append('<div class="day" id="' + count + '"> <div class="dot"> <svg height="40" width="40"> <circle cx="20" cy="20" r="20" fill="#ec6d4f" /> </svg> </div> <div class="date">' + data[i].month + '/' + data[i].date + '</div> </div>');
        count = count + 1;
    }
    current_calender = data;
    $(".day").on("click", function () {
        $("#board-detail").empty();
        var cnt = 0;
        for (var i in current_calender) {
            if (cnt == this.id)
                $("#board-detail").append(current_calender[i].board_content);
            cnt = cnt + 1;
        }
    });

    $(".next").on("click", function() {
        $("#scrollDay").animate({
            left: (nowLeft+=15) + "vw"
        }, {
            duration: 500,
            done: function() {

            }
        })
    });

    $(".prev").on("click", function() {
        $("#scrollDay").animate({
            left: (nowLeft-=15) + "vw"
        }, {
            duration: 500,
            done: function() {
                
            }
        })
    });
}
