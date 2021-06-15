(function () {
	new Swiper('.js-collection-swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 7,
				spaceBetween: 28
			},
			575: {
				slidesPerView: 6,
				spaceBetween: 20
			},
			480: {
				slidesPerView: 5,
				spaceBetween: 20
			},
			280: {
				slidesPerView: 4,
				spaceBetween: 8
			}
		}
	});
})();
