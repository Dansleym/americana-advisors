;(function() {

	/*	Code for validate only numbers
	*	Table with KEY-codes: https://keycode.info/
	*	8 - backspace/delete
	*	0 - key has no keycode
	*	13 - enter
	*	e < 48 || e > 57 - NOT NUMBERS
	*/

	$('.js-only-numbers').on('keypress', function(e) {
		if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});


	/* add max value for numeric input  */

	$('[data-max-val]').on('input', function(e) {
		let maxVal = Number($(this).attr('data-max-val') || 99);

		if ($(this).val() > maxVal) {
			$(this).val(maxVal);
		}
	})

	document.addEventListener('input', function(e) {
		const target = e.target;

		if(target.getAttribute('data-max-val')) {
			let maxVal = Number(target.getAttribute('data-max-val') || 99);

			if (target.value > maxVal) {
				target.value = maxVal;
			}
		}
	});
}());

