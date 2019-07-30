$(document).ready(function() { //顯示或更換顯示學院
    var url = window.location.href;
    console.log(url);
    var arr = url.split("/")
    console.log(arr);
    var department_type = 0;

    if (arr.length === 6) {
        if (arr[4] === "department") {
            console.log("department");

        } else {
            $(".backgroundimg").hide()
        }

    }

    if (arr[4] === "department") {
        if (arr.length == 6) {
            department_type = parseInt(arr[arr.length - 1])
        } else if (arr.length == 7) {
            $(".backgroundimg").hide()
            department_type = parseInt(arr[arr.length - 2])
            var department_name = decodeURI(arr[arr.length - 1])
            console.log(department_name + "getbold");
            $("#" + department_name).css("font-weight", "bold")
        }
        console.log(department_type);
        if (department_type != 0) {
            console.log("getbold")
            switch (department_type) {
                case 1:
                    console.log("1getbold")
                    $("[class='sideli 1']").css("font-weight", "bold")
                    break;
                case 2:
                    $("[class='sideli 2']").css("font-weight", "bold")
                    break;
                case 3:
                    $("[class='sideli 3']").css("font-weight", "bold")
                    break;
                case 4:
                    $("[class='sideli 4']").css("font-weight", "bold")
                    break;
                case 5:
                    $("[class='sideli 5']").css("font-weight", "bold")
                    break;
                case 6:
                    $("[class='sideli 6']").css("font-weight", "bold")
                    break;
                case 7:
                    $("[class='sideli 7']").css("font-weight", "bold")
                    break;
                case 8:
                    $("[class='sideli 8']").css("font-weight", "bold")
                    break;
                default:
                    console.log("getboldfailed")
            }
        }
    } else if (arr[4] === "community") {

        var community_name = decodeURI(arr[arr.length - 1])
        console.log(community_name + "getbold");
        $("#" + community_name).css("font-weight", "bold")
    } else if (arr[4] === "others") {
        var others_name = decodeURI(arr[arr.length - 1])
        console.log(others_name + "getbold");
        $("#" + others_name).css("font-weight", "bold")

    }
    ////////////////////////////////////////////////////////貝殼///////////////////////////////////////////////////////////////
    $(".linkimg").hover(function() {
        console.log("摸貝殼")
        $(this).attr("src", "/groups/貝殼打開.png")
        console.log("往上")
        $(this).css("bottom", "3vh")


    }, function() {
        $(this).attr("src", "/groups/貝殼關閉.png")
        $(this).css("bottom", "0")

    });
    ////////////////////////////////////////////////////////接上department後台//////////////////////////////////////////////////////
    $('#select_department_name').on('change', function() {

        $.ajax({
            url: `/groups/get_department`, ////要呼叫的route
            method: 'POST', //////用post方法才可以給data
            dataType: 'JSON', ////回傳形式
            data: {
                name: $('#select_department_name').val()
            },
            error: function(err) {
                console.log("change failed")
            },
            success: function(data) {
                console.log(data.name)
                console.log(data.type)
                console.log($("#edit_type").val())
                $("#edit_type").val(data.type) //////selection 比較特別需要用.val()來改
                console.log($("#edit_type").val())
                $("#edit_en_name").attr("value", data.en_name);
                $('#edit_de_link').attr("value", data.de_link);
                $('#edit_stu_link').attr("value", data.stu_link);
                $('#edit_qna_link').attr("value", data.qna_link);

            }

        });
    })

    $("#edit_department_submit").on('click', function() {
        $.ajax({
            url: `/groups/edit_department`,
            method: 'POST',
            dataType: 'JSON',
            data: {
                name: $('#select_department_name').val(),
                en_name: $("#edit_en_name").val(),
                type: $("#edit_type").val(),
                de_link: $('#edit_de_link').val(),
                stu_link: $('#edit_stu_link').val(),
                qna_link: $('#edit_qna_link').val(),
            },
            error: function(err) {
                console.log("edit failed")
            },
            success: function(data) {

                console.log("edit success")
                location.reload()
            }

        });
    })
    $("#delete_department_submit").on('click', function() {
            $.ajax({
                url: `/groups/delete_department`,
                method: 'POST',
                dataType: 'JSON',
                data: {
                    name: $('#select_department_name').val(),
                },
                error: function(err) {
                    console.log("delete failed")
                },
                success: function(data) {
                    console.log("edit success")
                    console.log(data)
                    location.reload()
                }

            });
        })
        //////////////////////////////////////////////////接上selection後台//////////////////////////////////////////////////////
    $('#select_community_name').on('change', function() {

        $.ajax({
            url: `/groups/get_community`, ////要呼叫的route
            method: 'POST', //////用post方法才可以給data
            dataType: 'JSON', ////回傳形式
            data: {
                name: $('#select_community_name').val()
            },
            error: function(err) {
                console.log("change failed")
            },
            success: function(data) {
                console.log(data.intro)

                $("#edit_intro").val(data.intro) //////selection 比較特別需要用.val()來改


            }

        });
    })
    $("#edit_community_submit").on('click', function() {
        $.ajax({
            url: `/groups/edit_community`,
            method: 'POST',
            dataType: 'JSON',
            data: {
                name: $('#select_community_name').val(),
                intro: $("#edit_intro").val()
            },
            error: function(err) {
                console.log("edit failed")
            },
            success: function(data) {

                console.log("edit success")
                location.reload()
            }

        });
    })
    $("#delete_community_submit").on('click', function() {
            $.ajax({
                url: `/groups/delete_community`,
                method: 'POST',
                dataType: 'JSON',
                data: {
                    name: $('#select_community_name').val(),
                },
                error: function(err) {
                    console.log("delete failed")
                },
                success: function(data) {
                    console.log("edit success")
                    console.log(data)
                    location.reload()
                }

            });
        })
        //////////////////////////////////////////////////接上others後台//////////////////////////////////////////////////////
    $('#select_others_name').on('change', function() {

        $.ajax({
            url: `/groups/get_others`, ////要呼叫的route
            method: 'POST', //////用post方法才可以給data
            dataType: 'JSON', ////回傳形式
            data: {
                name: $('#select_others_name').val()
            },
            error: function(err) {
                console.log("change failed")
            },
            success: function(data) {
                console.log(data.intro)

                $("#edit_intro").val(data.intro) //////selection 比較特別需要用.val()來改


            }

        });
    })
    $("#edit_others_submit").on('click', function() {
        $.ajax({
            url: `/groups/edit_others`,
            method: 'POST',
            dataType: 'JSON',
            data: {
                name: $('#select_others_name').val(),
                intro: $("#edit_intro").val()
            },
            error: function(err) {
                console.log("edit failed")
            },
            success: function(data) {

                console.log("edit success")
                location.reload()
            }

        });
    })
    $("#delete_others_submit").on('click', function() {
        $.ajax({
            url: `/groups/delete_others`,
            method: 'POST',
            dataType: 'JSON',
            data: {
                name: $('#select_others_name').val(),
            },
            error: function(err) {
                console.log("delete failed")
            },
            success: function(data) {
                console.log("edit success")
                console.log(data)
                location.reload()
            }

        });
    })














});