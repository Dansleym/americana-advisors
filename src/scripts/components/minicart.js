(function () {
	const miniCartTogglerSelector = '.js-toggle-mini-cart';
	const miniCartSelector        = '.js-mini-cart';
	const miniCartCloserSelector  = '.js-mini-cart-close';

	const miniCartOpenClass = 'mini-cart--open';

	const miniCartTemplateURL = `https://utd-trainee-roval.myshopify.com/cart?view=minicart`;

	const miniCartToggler = document.querySelector(miniCartTogglerSelector);
	const miniCart = document.querySelector(miniCartSelector);

	if (!miniCartToggler || !miniCart) {
		return;
	}

	const mobileBreakpoint = 575;
	let miniCartTransition = 300;

	let overlay;

	function containClass(element, className) {
		return element.classList.contains(className);
	}

	function isMiniCartOpen() {
		return containClass(miniCart, miniCartOpenClass);
	}

	function closeMiniCart() {
		if (!isMiniCartOpen()) {
			return;
		}

		miniCart.classList.remove(miniCartOpenClass);

		if (overlay) {
			clearOverlay(miniCart, miniCartTransition);
		}
	}

	function openMiniCart() {
		if (isMiniCartOpen()) {
			return;
		}

		miniCart.classList.add(miniCartOpenClass);

		overlay = addOverlay(miniCart);
		if (overlay) {
			overlay.addEventListener('click', () => {
				const clickEvent = new Event('click');
				clickEvent.data = miniCart.querySelector(miniCartCloserSelector);

				miniCart.dispatchEvent(clickEvent);

				clearOverlay(miniCart, miniCartTransition);
			});
		}
	}

	miniCartToggler.addEventListener('click', openMiniCart);

	miniCart.addEventListener('click', event => {
		const targetClass = miniCartCloserSelector.replace('.', '');

		const target = event.target;

		if (containClass(target, targetClass) ||
			(event.data && containClass(event.data, targetClass)) ||
			target.closest(miniCartCloserSelector)
		) {
			closeMiniCart();
		}
	});

	window.addEventListener('resize', () => {
		miniCartTransition = window.innerWidth <= mobileBreakpoint ? 200 : 300;
	});

	window.cartContainers?.push(miniCart);
	window.cartUrls?.push(miniCartTemplateURL);

	initCartUpdater(miniCart, miniCartTemplateURL);
})();
