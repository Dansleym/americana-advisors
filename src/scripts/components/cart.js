;(function () {
	const cartTemplateUrl = `https://utd-trainee-roval.myshopify.com/cart?view=ajax`;

	const cartContentContainerSelector = '.js-cart-content';

	const cartContentContainer = document.querySelector(cartContentContainerSelector);
	if (!cartContentContainer) {
		return;
	}

	window.cartContainers?.push(cartContentContainer);
	window.cartUrls?.push(cartTemplateUrl);

	initCartUpdater(cartContentContainer, cartTemplateUrl);
})();
