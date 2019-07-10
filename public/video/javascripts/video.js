/* Youtube api */
    
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
    
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'B_8YrtgyC5o',
    events: {
        'onReady': yt.onPlayerReady,
        'onStateChange': yt.onPlayerStateChange
    }
  });
}