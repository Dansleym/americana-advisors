window.cartContainers = [];
window.cartUrls = [];

function initCartUpdater(container, ajaxUrl) {
	const removeButtonsClass  = 'js-remove-line-item';
	const updateQuantityClass = 'js-update-quantity';
	const adjustButtonsClass  = 'js-quantity-adjust';
	const cartFormClass       = 'js-cart-form';

	const checkoutSelector      = '.js-checkout';
	const adjustButtonsSelector = '.js-quantity-adjust';

	let checkout = null;

	const containClass = function (element, className) {
		return element.classList.contains(className);
	}

	const setDisabledButtons = function () {
		document.querySelectorAll(adjustButtonsSelector)?.forEach(item => {
			const buttonValue = item.dataset.value;
			const itemQuantity = item.dataset.productQuantity;
			const variantInventoryQuantity = item.dataset.inventoryQuantity;
			const maxValue = variantInventoryQuantity ? variantInventoryQuantity : 99;

			if (buttonValue == -1 && itemQuantity > 1) {
				return;
			} else if (buttonValue == 1 && itemQuantity < maxValue) {
				return;
			}

			item.setAttribute('disabled', 'disabled');
		});
	}

	const initCheckoutCart = function (cart) {
		const checkoutForm = cart.querySelector('.' + cartFormClass);
		if (!checkoutForm) {
			return;
		}

		checkout = cart.querySelector(checkoutSelector);
		if (!checkout) {
			return;
		}

		checkout.addEventListener('click', () => {
			checkoutForm.submit();
		});

		checkoutForm.addEventListener('keydown', event => {
			if (event.keyCode === 13) {
				event.preventDefault();
			}
		});
	}

	const render = function (container, url) {
		new Promise(async function () {
			const html = await fetch(url)
				.then(response => response.text())
				.then(response => response.trim());

			if (container) {
				container.innerHTML = html;
				setDisabledButtons();
				initCheckoutCart(container);
			}
		});
	}

	const renderAll = function () {
		const containers = window.cartContainers;
		const urls = window.cartUrls;

		if (!containers || !urls) {
			return;
		}

		for (let i = 0; i < containers.length; i++) {
			render(containers[i], urls[i]);
		}
	}

	const removeItemFromCart = function (id) {
		CartJS.removeItemById(id).then(() => {
				renderAll();
			})
			.catch(error => {
				console.error(error);
			});
	}

	const updateCart = function (index, quantity) {
		CartJS.updateItem(index, quantity)
			.then(() => {
				renderAll();
			})
			.catch(error => {
				console.error(error);
			});
	}

	container.addEventListener('click', event => {
		const target = event.target;
		if (!containClass(target, removeButtonsClass)) {
			return;
		}

		const itemVariantID = target.dataset.cartRemoveVariant;
		if (itemVariantID) {
			removeItemFromCart(itemVariantID);
		}
	});

	container.addEventListener('change', event => {
		const target = event.target;
		if (!containClass(target, updateQuantityClass)) {
			return;
		}

		const itemVariantIndex = target.dataset.cartVariantIndex;
		const currentQuantity = CartJS.cart.items[itemVariantIndex - 1].quantity;
		let newQuantity = target.value;

		if (newQuantity === '' || newQuantity === '0') {
			newQuantity = currentQuantity;
		}

		if (itemVariantIndex) {
			updateCart(itemVariantIndex, newQuantity);
		}
	});

	container.addEventListener('click', event => {
		const target = event.target;
		if (!containClass(target, adjustButtonsClass)) {
			return;
		}

		const itemVariantIndex = target.dataset.cartVariantIndex;
		const currentQuantity = target.dataset.productQuantity;

		const newQuantity = Number(currentQuantity) + Number(target.dataset.value);

		if (itemVariantIndex) {
			updateCart(itemVariantIndex, newQuantity);
		}
	});

	$(document).on('cart.requestComplete', function (event, cart) {
		const maxNum = 9;
		const counter = $('.js-cart-counter');
		let count = +cart.item_count;
		if (count > maxNum) {
			count = maxNum + '+';
		}

		counter.html(count);

		if (count <= 0) {
			counter.hide();
		}
	});

	document.addEventListener('keydown', event => {
		const target = event.target;
		if (containClass(target, updateQuantityClass) && event.key === 'Enter') {
			target.blur();
		}
	});

	render(container, ajaxUrl);
}
