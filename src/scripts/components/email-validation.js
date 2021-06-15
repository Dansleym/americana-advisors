(function () {
	const form       = $(".js-newsletter-form");
	const input      = $(".js-newsletter-input");
	const button     = $(".js-newsletter-button");
	const text_error = $(".js-newsletter-error-text");

	function validateEmail(email) {
		const email_regular_expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email_regular_expression.test(email);
	}

	input.keydown(function (event) {
		input.toggleClass("input--error", false);
		button.removeAttr("disabled");
		text_error.toggleClass("newsletter__error-text--visibility", false);

		if (event.keyCode === 13) {
			event.preventDefault();
			return false;
		}
	});

	form.submit(function (event) {
		if (validateEmail(input.val())) {
			this.submit();
			input.val("");
			button.blur();
		} else {
			input.toggleClass("input--error");
			button.attr("disabled", "disabled");
			text_error.toggleClass("newsletter__error-text--visibility");
		}

		event.preventDefault();
	});
}());
