let click_open = $('.js-pdp-accordion-toggler'),
	drop_block = $('.js-pdp-accordion-content');

click_open.click(function(){
	let _this 			= $(this),
		_thisDrop 		= _this.next(drop_block),
		accordion 		= $('.js-pdp-accordion'),
		 _thisAccordion = $(this).parents('.js-pdp-accordion');

	if(!_thisAccordion.hasClass('accordion--open')){
		accordion.removeClass('accordion--open');
		_thisAccordion.toggleClass('accordion--open');
		drop_block.stop().slideUp(400);
		_thisDrop.stop().slideDown(400);
	}
	else if (accordion.hasClass('accordion--open')){
		_thisDrop.slideUp(400);
		_thisAccordion.toggleClass('accordion--open');
	}
});
