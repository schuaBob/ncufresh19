$(document).ready(function() { //顯示或更換顯示學院
    var url = window.location.href;
    console.log(url);
    var arr = url.split("/")
    console.log(arr);
    var department_type = 0;
    if (arr[4] === "department") {
        if (arr.length == 6) {
            department_type = parseInt(arr[arr.length - 1])
        } else if (arr.length == 7) {
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

    $('#edit_department_name').on('change', function() {
        $.ajax({
            url: `/documents/require_data/?id=${id}`,
            method: 'GET',
            dataType: 'JSON',
            error: function(err) {

            },
            success: function(data) {

            }

        });


    });








});