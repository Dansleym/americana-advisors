;(function() {

	/*
	* <a href="#footer" class="js-anchor-link">scroll to...</a>
	*/

	$('.js-anchor-link').on('click', function(e) {
		e.preventDefault();

		let linkedSection = $($(this).attr('href'));

		if (linkedSection.length > 0) {
			$('html, body').animate({
				scrollTop: linkedSection.offset().top
			}, 500)
		}
	});

}());