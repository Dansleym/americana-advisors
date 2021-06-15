(function () {
	const horizontalSlider   = document.querySelector('.js-product-horizontal-slider');
	const toggleConfigurator = document.querySelector('.js-product-toggle-configurator');
	const sliderButtons      = document.querySelectorAll('.js-product-slider-button');

	if (!horizontalSlider || !toggleConfigurator || !sliderButtons) {
		return;
	}

	const slidesAmount = horizontalSlider.querySelectorAll('.js-horizontal-slide').length;

	if (!slidesAmount) {
		return;
	}

	const productPhotos = new Swiper('.js-product-vertical-slider', {
		direction: 'vertical',
		slidesPerView: 'auto',
		watchSlidesVisibility: true,
		watchSlidesProgress: true
	});

	const productSlider = new Swiper(horizontalSlider, {
		loop: true,
		slidesPerView: 1,
		allowSlidePrev: slidesAmount !== 1,
		allowSlideNext: slidesAmount !== 1,
		navigation: {
			nextEl: '.js-product-next-button',
			prevEl: '.js-product-prev-button'
		},
		thumbs: {
			swiper: productPhotos
		},
		pagination: {
			el: '.js-product-pagination',
			clickable: true
		}
	});

	if (slidesAmount === 1) {
		sliderButtons.forEach(button => {
			button.classList.add('disabled');
		});
	}

	productSlider.on('slideChangeTransitionStart', () => {
		const activeIframe  = horizontalSlider.querySelector('.swiper-slide-active iframe');
		const activeVideo   = horizontalSlider.querySelector('.swiper-slide-active video');
		const activeWrapper = horizontalSlider.querySelector('.swiper-slide-active .js-video-preview');
		let isPlaying       = true;

		sliderButtons.forEach(button => {
			button.classList.remove('product__slider-button--state');
		});

		if (activeWrapper && activeIframe || activeWrapper && activeVideo) {
			sliderButtons.forEach(button => {
				button.classList.add('product__slider-button--state');
			});

			activeWrapper.addEventListener("click", function(event){
				activeWrapper.classList.add('product__video-slide-preview--transparent');

				if (activeIframe) {
					if (isPlaying === true) {
						activeIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
						isPlaying = false;
					} else {
						activeIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
						isPlaying = true;
					}
				} else if (activeVideo) {
					activeWrapper.style.display = "none";
					activeVideo.play();
				}
			});
		}

		stopVideos();
	});

	toggleConfigurator.addEventListener('click',  () => {
		stopVideos();
	});

	function stopVideos() {
		let sliderIframe = horizontalSlider.querySelectorAll('iframe');
		let sliderVideo  = horizontalSlider.querySelectorAll('video');

		if (!sliderIframe || !sliderVideo) {
			return;
		}

		sliderIframe.forEach((iframe) => {
			iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		});

		sliderVideo.forEach((video) => {
			video.pause();
		});
	}
})();
