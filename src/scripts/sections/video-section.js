let video = document.getElementById('video');
let	video_background = document.getElementsByClassName('js-video-section-overlay');
let button_video = document.getElementsByClassName('js-button-video');
let	tag = document.createElement('script');
let	player;

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(button_video).on('click', function () {
	player = new YT.Player('video');
 	$(video_background).css( "display", "none");
	$(button_video).css( "display", "none");
 	$('.js-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
});

window.onload = () => {
	let observer = new IntersectionObserver(() => {
		if (player && player.getPlayerState() === 1) {
			$('.js-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
	}, {threshold: 0.6})
	if (video) {
		observer.observe(video);
	}
}
