(function () {
	const mainSliderSwiperContainerSelector = '.js-main-slider-swiper';
	const mainSliderSwiperWrapperSelector   = '.js-main-slider-swiper-wrapper';
	const mainSliderSwiperSlide             = '.js-main-slider-slide';
	const mainSliderVideoSelector           = '.js-slider-video';
	const mainSliderVideoPlayerSelector     = '.js-slider-video-player';
	const mainSliderActiveSlideSelector     = '.swiper-slide-active';

	const videoClasses = 'main-slider__media-content main-slider__media-content--video js-slider-video';
	const vimeoClass   = 'main-slider__media-vimeo-player';

	const mobileBreakpoint  = 767;
	const mobileImageHeight = 280;
	const sizeUnit          = 'px';
	const fullSize          = "100%";

	let mainSliderSwiper = null;
	const playersVideo   = new Map();

	const mainSliderSwiperContainer = document.querySelector(mainSliderSwiperContainerSelector);
	if (!mainSliderSwiperContainer) {
		return;
	}

	const slides = mainSliderSwiperContainer.dataset['slides'];
	if (slides < 1) {
		return;
	}

	function sliderHeightRecalculation() {
		const mainSliderSwiperWrapper = document.querySelector(mainSliderSwiperWrapperSelector);
		const mainSliderActiveSlide = getActiveSlide();
		if (!mainSliderSwiperWrapper || !mainSliderActiveSlide) {
			return;
		}

		if (window.innerWidth < mobileBreakpoint ||
			window.screen.width < mobileBreakpoint
		) {
			mainSliderSwiperWrapper.style.maxHeight = mainSliderActiveSlide.scrollHeight + sizeUnit;
		} else {
			mainSliderSwiperWrapper.style.maxHeight = fullSize;
		}
	}

	function changeSlidesAutoplayDelay() {
		const allSlides = document.querySelectorAll(mainSliderSwiperSlide);

		const defaultSliderDelay = 6000;
		let slidesDelay = isMobile() ? mainSliderSwiperContainer.dataset['mobile'] :
			mainSliderSwiperContainer.dataset['desktop'];

		if (slidesDelay) {
			slidesDelay *= 1000;
		} else {
			slidesDelay = defaultSliderDelay;
		}

		allSlides.forEach(slide => {
			slide.setAttribute('data-swiper-autoplay', slidesDelay);
		})
	}

	function getActiveSlide() {
		return document.querySelector(mainSliderActiveSlideSelector);
	}

	function getCurrentVideo() {
		const activeSlide = getActiveSlide();
		if (!activeSlide) {
			return null;
		}
		return activeSlide.querySelector(mainSliderVideoSelector);
	}

	function isYouTube(videoElement) {
		return videoElement != null && videoElement.dataset['type'] && videoElement.dataset['type'] === 'youtube';
	}

	function isVimeo(videoElement) {
		return videoElement != null && videoElement.dataset['type'] && videoElement.dataset['type'] === 'vimeo';
	}

	function isMobile() {
		return window.innerWidth <= mobileBreakpoint;
	}

	function playCurrentVideo() {
		const video = getCurrentVideo();
		if (!video) {
			return;
		}

		const videoID = video.id;
		if (!playersVideo.has(videoID)) {
			return;
		}

		if (isYouTube(video)) {
			playersVideo.get(videoID).playVideo();
		} else if (isVimeo(video)) {
			playersVideo.get(videoID).play();
		}
	}

	function pauseCurrentVideo() {
		const video = getCurrentVideo();
		if (!video) {
			return;
		}

		const videoID = video.id;
		if (!playersVideo.has(videoID)) {
			return;
		}

		if (isYouTube(video)) {
			playersVideo.get(videoID).pauseVideo();
		} else if (isVimeo(video)) {
			playersVideo.get(videoID).pause();
		}
	}

	window.onYouTubeIframeAPIReady = function () {
		const videoPlayers = document.querySelectorAll(mainSliderVideoPlayerSelector);

		function tryAutoplaySlider() {
			if (mainSliderSwiperContainer.dataset['hover'] === 'none') {
				mainSliderSwiper.autoplay.start();
			}
		}

		if (videoPlayers) {
			videoPlayers.forEach(player => {
				const playerId = player.id;
				const playerType = player.dataset['type'];
				const videoId = player.dataset['id'];

				let videoPlayer = null;

				if (isYouTube(player)) {
					videoPlayer = new YT.Player(playerId, {
						videoId: videoId,
						playlist: videoId,
						playerVars: {
							loop: 1,
							controls: 0,
							autohide: 1,
							showinfo: 0,
							rel: 0,
							modestbranding: 1,
							iv_load_policy: 3,
							fs: 0,
							enablejsapi: 1,
						},
						events: {
							'onStateChange': function (event) {
								const iframe = event.target.f;

								if (event.data === YT.PlayerState.ENDED) {
									mainSliderSwiper.slideNext();
									event.target.stopVideo();
									tryAutoplaySlider();
								}

								if (event.data === YT.PlayerState.PLAYING) {
									if (iframe) {
										event.target.mute();
										iframe.style.opacity = '1';
									}
								}
							},
							'onReady': function (event) {
								event.target.mute();
								event.target.f.style.opacity = '0';
							}
						}
					});
				} else if (isVimeo(player)) {
					videoPlayer = new Vimeo.Player(playerId, {
						id: videoId,
						background: true,
						byline: false,
						controls: false,
						muted: true,
						portrait: false,
						title: false
					});

					const playerElement = videoPlayer.element;
					playerElement.style.transform = 'unset';

					videoPlayer.on('play', function (data) {
						const playerIframe = videoPlayer.element;
						playerIframe.setAttribute('class', vimeoClass);
					});

					videoPlayer.on('timeupdate', function (data) {
						if (data.percent >= 0.95) {
							mainSliderSwiper.slideNext();
							videoPlayer.unload();
							tryAutoplaySlider();
						}
					});
				}

				if (videoPlayer) {
					playersVideo.set(videoId, videoPlayer);

					const videoIframe = document.getElementById(playerId);

					if (videoIframe) {
						videoIframe.setAttribute('id', videoId);
						videoIframe.setAttribute('data-type', playerType);
						videoIframe.setAttribute('class', videoClasses);
					}
				}
			});
		}
	}

	changeSlidesAutoplayDelay();

	mainSliderSwiper = new Swiper(mainSliderSwiperContainerSelector, {
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 6000
		},
		simulateTouch: false,
		allowTouchMove: false,
	});

	if (mainSliderSwiper) {
		mainSliderSwiper.on('slideChange', () => {
			if (!isMobile()) {
				pauseCurrentVideo();
			}
		});

		mainSliderSwiper.on('slideChangeTransitionStart', () => {
			sliderHeightRecalculation();
			if (!isMobile()) {
				playCurrentVideo();
			}
		});
	}

	if (mainSliderSwiper) {
		window.addEventListener('resize', () => {
			sliderHeightRecalculation();
			changeSlidesAutoplayDelay();

			if (!isMobile()) {
				playCurrentVideo();
			} else {
				pauseCurrentVideo();
			}
		});

		window.addEventListener('scroll', () => {
			const windowScroll = window.scrollY;

			if (window.innerWidth > mobileBreakpoint ||
				window.screen.width > mobileBreakpoint
			) {
				return;
			}

			if (windowScroll >= mobileImageHeight) {
				if (mainSliderSwiper.autoplay.running) {
					mainSliderSwiper.autoplay.stop();
					return;
				}
			}

			if (!mainSliderSwiper.autoplay.running) {
				mainSliderSwiper.autoplay.start();
			}
		});

		mainSliderSwiperContainer.addEventListener('mouseenter', () => {
			if (!isMobile()) {
				mainSliderSwiper.autoplay.stop();
				mainSliderSwiperContainer.setAttribute('data-hover', 'hover');
			} else {
				mainSliderSwiper.autoplay.start();
				mainSliderSwiperContainer.setAttribute('data-hover', 'none');
			}
		});

		mainSliderSwiperContainer.addEventListener('mouseleave', () => {
			if (!isMobile()) {
				mainSliderSwiper.autoplay.start();
				mainSliderSwiperContainer.setAttribute('data-hover', 'none');
			}
		});
	}

	if (!isMobile()) {
		playCurrentVideo();
	}

	sliderHeightRecalculation();
})();
