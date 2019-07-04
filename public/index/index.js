$(document).ready(()=>{
    $('#fullpage').fullpage({
        anchors:['firstPage', 'secondPage', 'thirdPage']
    });
    
    //methods
    $.fn.fullpage.setAllowScrolling(true);
})
