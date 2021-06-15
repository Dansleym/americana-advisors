;(function() {
	let accordionContainer = $('.js-accordion-container')
	let accordionToggler = $('.js-accordion-toggler');

	if (accordionToggler.length < 1) {
		return;
	}

	if (accordionContainer.length) {
		accordionContainer.on('click', '.js-accordion-toggler', toggleAccordion);
	} else {
		accordionToggler.click(toggleAccordion);
	}

	function toggleAccordion() {
		let accordion = $(this).parents('.js-accordion');
		let accordionContent = accordion.find('.js-accordion-content');
		accordion.toggleClass('accordion--open');
		accordionContent.stop().slideToggle(400, function() {
			$(this).css('height' , '');
		});
	}
}());
