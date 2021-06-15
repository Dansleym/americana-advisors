(function() {
	const animationTogglerSelector = '.js-animation-toggler';
	const animatedElementSelector  = '.js-animated-target';
	const animationClass           = 'collection-banner__arrow--open';

	const mobileBreakpoint = 767;

	const animationToggler = document.querySelector(animationTogglerSelector);
	const animatedElement  = document.querySelector(animatedElementSelector);
	if(!animationToggler || !animatedElement) {
		return;
	}

	function dispatchEvent(element, event) {
		element.dispatchEvent(event);
	}

	animationToggler.addEventListener('click', function() {
		animatedElement.classList.toggle(animationClass);
	});

	window.addEventListener('resize', () => {
		if(window.innerWidth <= mobileBreakpoint) {
			if(!animatedElement.classList.contains(animationClass)) {
				dispatchEvent(animationToggler, new Event('click'));
			}
		}
		else {
			if(animatedElement.classList.contains(animationClass)) {
				dispatchEvent(animationToggler, new Event('click'));
			}
		}
	});

	if(window.innerWidth <= mobileBreakpoint) {
		dispatchEvent(animationToggler, new Event('click'));
	}
})();
