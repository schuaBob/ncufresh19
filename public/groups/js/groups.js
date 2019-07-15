$(document).ready(function() { //顯示或更換顯示學院
    console.log("jscalled")
    var currentid = null;

    $(".sideli").on('click', function() {
        console.log("click")

        $(".sideli").css("font-weight", "lighter")
        console.log(this);
        $(this).css("font-weight", "bold")

        var showclass = $(this).attr("class"); //取得被點擊li的所有class
        var classes = showclass.split(" "); //分隔出每個class
        console.log(classes[1])
        $("." + classes[1]).show();

    })








});