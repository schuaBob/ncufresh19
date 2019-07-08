$(document).ready(function() {
    console.log("jscalled")
    var currentid = null;
    $(".sidebar2").hide();
    $(".sideli").on('click', function() {
            console.log("click")
            $(".sidebar2").hide();
            $(".sideli").css("font-weight", "lighter")
            console.log(this);
            $(this).css("font-weight", "bold")

            var showclass = $(this).attr("class");
            var classes = showclass.split(" ");


            $("." + classes[1]).show();
        })
        /*
    $('#ind').on('click', function() {
        console.log("click")
        if (currentid != null) {
            console.log("lasthide")
            currentid.hide();
        }
        $("#indb").show();
        currentid = $('#indb');

    })
    $('#chi').on('click', function() {
        console.log("chiclick")
        if (currentid != null) {
            console.log("lasthide")

            currentid.hide();
        }
        $("#chib").show();
        currentid = $('#chib');

    })

*/


});