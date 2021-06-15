(function() {
	const accountSwitcher = document.querySelector('.js-account-switcher');
	const accountSelect = document.querySelector('.js-account-switcher-wrapper');
	let currentAccount = document.querySelector('.js-account-switcher-current-account');

	if (!accountSwitcher || !accountSelect || !currentAccount) {
		return;
	}

	const toggleDropdown = () => accountSwitcher.classList.toggle('is-active');
	const closeDropdown = () => accountSwitcher.classList.remove('is-active');

	window.addEventListener('click', function (event) {
		if (!accountSwitcher.contains(event.target)) {
			closeDropdown();
		}
	});

	accountSelect.addEventListener('click', toggleDropdown);
})();
