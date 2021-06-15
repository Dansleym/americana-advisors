(function () {
	const instagramFeedSelector              = '.js-instafeed';
	const instagramFeedSwiperSelector        = '.js-instafeed-swiper';
	const instagramFeedSwiperWrapperSelector = '.js-instafeed-swiper-wrapper';
	const instagramFeedSwiperSlideSelector   = '.js-instafeed-swiper-slide';
	const tokenAttribute                     = 'token';

	const instagramFeedBlocks = document.querySelectorAll(instagramFeedSelector);
	if (!instagramFeedBlocks) {
		return;
	}

	const tokens = [];
	const blocks = [];

	instagramFeedBlocks.forEach(block => {
		let currentToken = block.dataset[tokenAttribute];
		if (currentToken) {
			tokens.push(currentToken);
			blocks.push(block);
		}
	});

	for (let i = 0; i < tokens.length; i++) {
		let userFeed = new Instafeed({
			accessToken: tokens[i],
			target: blocks[i],
			sortBy: 'most-recent',
			template: `
				<div class="swiper-slide instagram-feed__slide js-instafeed-swiper-slide">
					<div class="instagram-feed__image-wrapper">
          				<a class="instagram-feed__image-aspect-ratio" href="{{ link }}" target="_blank">
              				<img class="instagram-feed__image" alt="{{ model.username }}" src="{{ image }}">
          				</a>
      				</div>
				</div>	
    		`
		});

		userFeed.run();
	}

	let instagramFeedSwiper = null;

	function initSwiper(swiper) {
		document.querySelectorAll(instagramFeedSwiperWrapperSelector)
			.forEach(item => {
				item.removeAttribute('style');
			});
		document.querySelectorAll(instagramFeedSwiperSlideSelector)
			.forEach(item => {
				item.removeAttribute('style');
			});

		if (!swiper) {
			swiper = new Swiper(instagramFeedSwiperSelector, {
				speed: 700,
				spaceBetween: 10,
				slidesPerView: 3,
				slidesPerColumn: 2,
				observer: true,
				observeParents: true,
				mousewheel: true,
				mousewheelSensitivity: 0.02,
				breakpoints: {
					300: {
						spaceBetween: 10,
						slidesPerView: 3,
						slidesPerColumn: 2,
					},
					576: {
						spaceBetween: 10,
						slidesPerView: 6,
						slidesPerColumn: 1,
					},
				}
			});
		}
	}

	initSwiper(instagramFeedSwiper);

	window.addEventListener('resize', () => {
		initSwiper(instagramFeedSwiper);
	});
})();
