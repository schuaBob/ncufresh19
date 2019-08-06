var current_calender;
var nowLeft = 30,
    nowTarget = 0,
    nowTotal = 0,
    lastClick = -1;
var isAnimating = false;

$(document).ready(() => {
    $('#fullpage').fullpage({
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        anchors: ['indexPage', 'newsPage', 'callenderPage'],
        slideSelector: '.fpslide',
        scrollOverflow: true,
        normalScrollElements: '#news-body, #board-detail, .modal',
        afterLoad: function (anchorLink, index) {
            if (index.index === 0) {
                $("#topHref").css("display", "none");
                $("#footer").removeClass();
            }
            else if (index.index === 1) {
                $("#topHref").css("display", "inline");
                $("#footer").addClass("myinvisible");
            }
            else {
                $("#topHref").css("display", "inline");
                $("#footer").addClass("myinvisible");
            }
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
                var catePicArr = ["重要通知", "重要通知", "學校活動", "課業相關", "生活日常", "網站問題", "學生組織"];
                $('.cateIcon').html(`<img src="index/icon-${catePicArr[res.category]}.png" class="card-img">`);
                $('#newsdetail').html(res.content);
            }
        })
    });

    $(".next").on("click", function () {
        if (!isAnimating && nowTarget < nowTotal-1) {
            isAnimating = true;
            $("#scrollDay").animate({
                left: (nowLeft -= 15) + "vw"
            }, {
                duration: 500,
                done: function () {
                    isAnimating = false;
                    $("#" + nowTarget).removeClass("target");
                    nowTarget += 1;
                    $("#" + nowTarget).addClass("target");
                    $("#board-detail").empty();
                    var cnt = 0;
                    for (var i in current_calender) {
                        if (cnt == nowTarget)
                            $("#board-detail").append(current_calender[i].board_content);
                        cnt = cnt + 1;
                    }
                }
            });
        }
    });

    $(".prev").on("click", function () {
        if (!isAnimating && nowTarget > 0) {
            isAnimating = true;
            $("#scrollDay").animate({
                left: (nowLeft += 15) + "vw"
            }, {
                duration: 500,
                done: function () {
                    isAnimating = false;
                    $("#" + nowTarget).removeClass("target");
                    nowTarget -= 1;
                    $("#" + nowTarget).addClass("target");
                    $("#board-detail").empty();
                    var cnt = 0;
                    for (var i in current_calender) {
                        if (cnt == nowTarget)
                            $("#board-detail").append(current_calender[i].board_content);
                        cnt = cnt + 1;
                    }
                }
            });
        }
    });

    $.ajax({
        url: "calender_get_data",
        method: "POST",
        data: {
            id: "aug"
        },
        error: function (err) {
            alert("Some error occur...");
        },
        success: function (data) {
            append_circle(data);
            $("#board-detail").empty();
            $("#board-detail").append(current_calender[0].board_content);
            nowLeft = 30;
            nowTarget = 0;
        }
    });

    $(".switch input").click(function(){
        if($(this).prop("checked") == true){
            // $("#carouselExampleIndicators").css("display", "block");
            // $("#news").css("display", "none");
            $("#carouselExampleIndicators").removeClass("myinvisible");
            $("#news").addClass("myinvisible");
        } else {
            // $("#carouselExampleIndicators").css("display", "none");
            // $("#news").css("display", "block");
            $("#carouselExampleIndicators").addClass("myinvisible");
            $("#news").removeClass("myinvisible");
        }
    });
});

$(".selectMonth").on("click", function () {
    $.ajax({
        url: "calender_get_data",
        method: "POST",
        data: {
            id: this.id
        },
        error: function (err) {
            alert("Some error occur...");
        },
        success: function (data) {
            append_circle(data);
            $("#board-detail").empty();
            $("#board-detail").append(current_calender[0].board_content);
            nowLeft = 30;
            nowTarget = 0;
        }
    });
});

function append_circle(data) {
    $("#days").empty();
    $("#days").append('<div id="scrollDay"></div>');
    var count = 0;
    var today = new Date();
    for (var i in data) {
        $("#scrollDay").append('<div class="day" id="' + count + '"> <div class="dot"> <svg height="35" width="35"> <circle cx="17.5" cy="17.5" r="17.5" fill="#ec6d4f" /> </svg> </div> <div class="date">' + data[i].month + '/' + data[i].date + '</div> </div>');
        if ((today.getMonth() + 1) == data[i].month && today.getDate() == data[i].date)
            $("#" + count).append('<img id="index3crab" src="/index/首頁3_螃蟹去背.png">');
        count = count + 1;
    }
    nowTotal = count;
    current_calender = data;
    $(".day").on("click", function () {
        var width = $(window).width();
        if(width > 1024) {
            if(lastClick !== -1)
                $("#" + lastClick + " div svg circle").attr("fill", "#ec6d4f")
            $("#board-detail").empty();
            var cnt = 0;
            for (var i in current_calender) {
                if (cnt == this.id)
                    $("#board-detail").append(current_calender[i].board_content);
                cnt = cnt + 1;
            }
            lastClick = this.id;
            $("#" + lastClick + " div svg circle").attr("fill", "#fff9dc")

        } else {
            var tobescroll = this.id - nowTarget;
            if(tobescroll !== 0) {
                isAnimating = true;
                $("#scrollDay").animate({
                    left: (nowLeft -= (tobescroll * 15)) + "vw"
                }, {
                    duration: 500,
                    done: function () {
                        isAnimating = false;
                        $("#" + nowTarget).removeClass("target");
                        nowTarget += tobescroll;
                        $("#" + nowTarget).addClass("target");
                        $("#board-detail").empty();
                        var cnt = 0;
                        for (var i in current_calender) {
                            if (cnt == nowTarget)
                                $("#board-detail").append(current_calender[i].board_content);
                            cnt = cnt + 1;
                        }
                    }
                });
            }
        }
    });

    $("#0").addClass("target");
    var vw = window.innerWidth;
    if (vw > 1025) {
        ///電腦版
        $("#indexOneCircle circle").attr('cx', '50');
        $("#indexOneCircle circle").attr('cy', '50');
        $("#indexOneCircle circle").attr('r', '40');
        $('.bigCircle').attr('cx', '60px');
        $('.bigCircle').attr('cy', '60px');
        $('.bigCircle').attr('r', '60px');
    } else if (vw < 768) {
        ///手機板
        $("#indexOneCircle circle").attr('cx', '35');
        $("#indexOneCircle circle").attr('cy', '35');
        $("#indexOneCircle circle").attr('r', '25');
        $('.bigCircle').attr('cx', '11vw');
        $('.bigCircle').attr('cy', '11vw');
        $('.bigCircle').attr('r', '11vw');
    } else if ((1025 > vw) && (vw > 768)) {
        ///平板
        $("#indexOneCircle circle").attr('cx', '50');
        $("#indexOneCircle circle").attr('cy', '50');
        $("#indexOneCircle circle").attr('r', '40');
        $('.bigCircle').attr('cx', '50px');
        $('.bigCircle').attr('cy', '50px');
        $('.bigCircle').attr('r', '50px');
    }
    window.addEventListener('resize', () => {
        var vw = window.innerWidth;
        if (vw > 1025) {
            ///電腦版
            $("#indexOneCircle circle").attr('cx', '50');
            $("#indexOneCircle circle").attr('cy', '50');
            $("#indexOneCircle circle").attr('r', '40');
            $('.bigCircle').attr('cx', '60px');
            $('.bigCircle').attr('cy', '60px');
            $('.bigCircle').attr('r', '60px');
        } else if (vw < 768) {
            ///手機板
            $("#indexOneCircle circle").attr('cx', '35');
            $("#indexOneCircle circle").attr('cy', '35');
            $("#indexOneCircle circle").attr('r', '25');
            $('.bigCircle').attr('cx', '11vw');
            $('.bigCircle').attr('cy', '11vw');
            $('.bigCircle').attr('r', '11vw');
        } else if ((1025 > vw) && (vw > 768)) {
            ///平板
            $("#indexOneCircle circle").attr('cx', '50');
            $("#indexOneCircle circle").attr('cy', '50');
            $("#indexOneCircle circle").attr('r', '40');
            $('.bigCircle').attr('cx', '50px');
            $('.bigCircle').attr('cy', '50px');
            $('.bigCircle').attr('r', '50px');
        }
    });
}