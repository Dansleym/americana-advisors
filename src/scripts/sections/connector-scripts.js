(function () {
	function connectScript(source) {
		const scriptTag = document.createElement('script');

		scriptTag.src = source;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
	}

	const apiYouTubeVideo = "https://www.youtube.com/iframe_api";
	const apiVimeoVideo = "https://player.vimeo.com/api/player.js";

	connectScript(apiYouTubeVideo);
	connectScript(apiVimeoVideo);
})();
