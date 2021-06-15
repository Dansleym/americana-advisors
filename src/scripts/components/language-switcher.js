(function() {
	const languageSwitcher = document.querySelectorAll('.js-language-switcher');
	const languageList     = document.querySelectorAll('.js-language-switcher-item');
	let currentLanguage    = document.querySelectorAll('.js-language-switcher-current-language');

	if (!languageSwitcher || !languageList || !currentLanguage) {
		return;
	}

	window.addEventListener('click', function (event) {
		languageSwitcher.forEach(switcher => {
			if (!switcher.contains(event.target)) {
				switcher.classList.remove('is-active');
			}
		});
	});

	languageSwitcher.forEach(switcher => {
		switcher.addEventListener('click', function() {
			switcher.classList.toggle('is-active');
		});
	});

	languageList.forEach(languageListItem => {
		languageListItem.addEventListener('click', function () {
			currentLanguage.forEach(currentLanguage => {
				currentLanguage.innerHTML = languageListItem.innerHTML;
			});

			languageListItem.parentElement.classList.toggle('is-active');
		});
	});
})();
