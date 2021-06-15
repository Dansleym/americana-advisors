let x = $('#newsletter-form').attr('action');

(function () {
	let popupOpenClass = 'popup--open';
	let popup = $('.popup');
	let popupId = popup.attr('id');
	let formAction = $('#newsletter-form').attr('action');

	if (formAction != undefined) {
		$(document).on('popup:open', function (e, popup, popupId) {
			console.log(popupId, ' POPUP is open');
			popup.addClass(popupOpenClass);
			bodyScrollLock.disableBodyScroll(popup[0]);
		});
	}

	$(document).on('popup:close', function (e, popup, popupId) {
		console.log(popupId, ' POPUP is close');
		bodyScrollLock.clearAllBodyScrollLocks();
	});

	popup.on('click', ".js-popup-close", e => {
		e.preventDefault();
		$(".popup--open").removeClass("popup--open");
		bodyScrollLock.clearAllBodyScrollLocks();
	})

	$(document).ready(function () {
		$("#setCookie").click(function () {
			$.cookie("popup", "", {expires: 0, path: '/'});
		});

		$("#popup-overlay").click(function () {
			$.cookie("popup", "", {expires: 0, path: '/'});
		});

		if ($.cookie("popup") == null) {
			setTimeout(() => $(document).trigger("popup:open", [popup, popupId]), 10000);
		} else {
			$(".popup--open").removeClass("popup--open")
			bodyScrollLock.clearAllBodyScrollLocks();
		}
	});
}());

(function () {
	const form = $(".js-newsletter-popup-form");
	const input = $(".js-newsletter-popup-input");
	const button = $(".js-newsletter-popup-button");
	const text_error = $(".js-newsletter-popup-error-text");

	function validateEmail(email) {
		const email_regular_expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email_regular_expression.test(email);
	}

	input.keydown(function (event) {
		input.toggleClass("input--error", false);
		button.removeAttr("disabled");
		text_error.css("visibility", "hidden");

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
			text_error.css("color", "#D6161D");
			button.attr("disabled", "disabled");
			input.toggleClass("input--error");
			text_error.css("visibility", "visible");
		}

		event.preventDefault();
	});
}());
