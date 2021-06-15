(function() {
	const toggleConfigurator      = document.querySelector('.js-product-toggle-configurator');
	const configurator            = document.querySelector('.js-configurator');
	const buttonCloseConfigurator = document.querySelector('.js-configurator-close');
	const toggleTransition        = 300;
	let overlay;

	if(!toggleConfigurator || !configurator || !buttonCloseConfigurator) {
		return;
	}

	function openConfigurator() {
		configurator.classList.add('configurator--open');
		overlay = addOverlay(configurator);

		if (overlay) {
			overlay.addEventListener('click', () => {
				buttonCloseConfigurator.dispatchEvent(new Event('click'));
				clearOverlay(configurator, toggleTransition);
			});
		}
	}

	function closeConfigurator() {
		configurator.classList.remove('configurator--open');

		if (overlay) {
			clearOverlay(configurator, toggleTransition);
		}
	}

	if (buttonCloseConfigurator) {
		buttonCloseConfigurator.addEventListener('click', closeConfigurator);
	}

	toggleConfigurator.addEventListener('click',  () => {
		openConfigurator();
	});
})();
