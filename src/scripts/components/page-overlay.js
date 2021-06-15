function addOverlay(target) {
	const horizontalSlider = document.querySelector('.js-product-horizontal-slider');
	const overlay          = document.querySelector('#full-page-overlay');
	if (overlay) {
		return;
	}

	const burgerMenu = document.querySelector('.js-burger-menu');

	if (burgerMenu?.classList.contains('open')) {
		burgerMenu?.dispatchEvent(new Event('click'));
	}

	const disableBodyScroll = bodyScrollLock.disableBodyScroll;

	const overlayTag = document.createElement('div');
	const mainTag = document.querySelector('main');

	if (mainTag) {
		overlayTag.setAttribute('id', 'full-page-overlay');
		mainTag.parentNode.insertBefore(overlayTag, mainTag);

		if (horizontalSlider) {
			const slideWidth  = document.querySelector('.js-horizontal-slide');
			horizontalSlider.setAttribute('style', 'width: ' + slideWidth.offsetWidth.toString() + 'px');
		}

		disableBodyScroll(target);
	}

	return overlayTag;
}

function clearOverlay(target, delay) {
	const overlay = document.querySelector('#full-page-overlay');
	const horizontalSlider = document.querySelector('.js-product-horizontal-slider');

	const enableBodyScroll = bodyScrollLock.enableBodyScroll;

	if (overlay) {
		setTimeout(() => {
			enableBodyScroll(target);
			overlay.remove();

			if (horizontalSlider) {
				horizontalSlider.removeAttribute('style');
			}
		}, delay);
	}
}
