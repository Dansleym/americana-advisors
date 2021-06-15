(function () {
	const content_overlapping 	= document.querySelector('.js-content-overlapping');
	const header 				= document.querySelector('.js-header');
	const utility_bar 			= document.querySelector('.js-utility-bar');
	const burger_menu 			= document.querySelector('.js-burger-menu');
	const searchSubmitButton 	= document.querySelector(".js-header-search-icon");
	const searchInput 			= document.querySelector(".js-header-search-input");
	const searchForm 			= document.querySelector(".js-header-search-form");
	const sideSearchSubmitButton = document.querySelector(".js-sidebar-menu-search-icon");
	const sideSearchInput 		= document.querySelector(".js-sidebar-menu-search-input");
	const sideSearchForm 		= document.querySelector(".js-sidebar-menu-search-form");
	const sidebar_menu 			= document.querySelector('.js-sidebar-menu');
	const sidebar_menu_list 	= document.querySelector('.js-sidebar-menu-list');
	const sidebar_menu_link 	= document.querySelector('.js-sidebar-menu-link');
	const sidebar_menu_shop_back 	= document.querySelector('.js-sidebar-menu-shop-back');
	const sidebar_menu_submenu_wrapper 	= document.querySelector('.js-sidebar-menu-submenu-wrapper');
	const miniCart	                = document.querySelector('.js-mini-cart');

	const MainContent 			= document.getElementById('MainContent');
	const disableBodyScroll 	= bodyScrollLock.disableBodyScroll;
	const enableBodyScroll 		= bodyScrollLock.enableBodyScroll;

	let header_height 			= header.clientHeight;
	let utility_bar_height 		= utility_bar.clientHeight;
	let menuOpen = false;
	let subMenuOpen = false;
	let subMenuRotate = true;

	if (!content_overlapping || !header 			|| !utility_bar
		|| !burger_menu 	 || !searchSubmitButton || !searchInput
		|| !searchForm 		 || !sidebar_menu 		|| !sidebar_menu_list
		|| !sideSearchInput  || !sideSearchForm 	|| !sideSearchSubmitButton
		|| !MainContent 	 || !sidebar_menu_link || !sidebar_menu_submenu_wrapper
		|| !sidebar_menu_shop_back || !miniCart) {
		return;
	}

	setTimeout(() => {
		sidebar_menu_link.dispatchEvent(new Event('click'));
	}, 1000);

	MainContent.style.paddingTop = header_height + 'px';
	sidebar_menu_list.style.height = (window.innerHeight - header_height) + "px";

	searchInput.onfocus = () => {
		searchSubmitButton.classList.add('focus');
	}
	searchInput.onblur = () => {
		searchSubmitButton.classList.remove('focus');

	}
	searchSubmitButton.onclick = function () {
		searchForm.submit();
	}

	sideSearchInput.onfocus = () => {
		sideSearchSubmitButton.classList.add('focus');
	}
	sideSearchInput.onblur = () => {
		sideSearchSubmitButton.classList.remove('focus');

	}
	sideSearchSubmitButton.onclick = function () {
		sideSearchForm.submit();
	}

	window.addEventListener("resize", function () {
		burger_menu.classList.remove('open');
		sidebar_menu.style.left = -1000 + 'px';
		sidebar_menu_list.style.display = 'none';
		content_overlapping.style.display = 'none';
		menuOpen = false;
		enableBodyScroll(sidebar_menu_list);
		MainContent.style.paddingTop = header_height + 'px';
		sidebar_menu_list.style.height = (window.innerHeight - header_height) + "px";

		if(!subMenuOpen) {
			sidebar_menu_submenu_wrapper.classList.remove('open');
			subMenuRotate = false;
		}
	});

	burger_menu.addEventListener('click', () => {
		if (!menuOpen) {
			burger_menu.classList.add('open');
			sidebar_menu.style.left = 0;
			content_overlapping.style.display = 'block';
			sidebar_menu_list.style.display = 'flex';
			menuOpen = true;
			disableBodyScroll(sidebar_menu_list);
			sidebar_menu_list.scrollTop = 0;
		} else {
			burger_menu.classList.remove('open');
			sidebar_menu.style.left = -1000 + 'px';
			content_overlapping.style.display = 'none';
			sidebar_menu_list.style.display = 'none';
			menuOpen = false;
			enableBodyScroll(sidebar_menu_list);
			sidebar_menu_submenu_wrapper.classList.remove('open');
			subMenuRotate = false;
		}
	});

	content_overlapping.addEventListener('click', () => {
		if(menuOpen) {
			burger_menu.classList.remove('open');
			sidebar_menu.style.left = -1000 + 'px';
			menuOpen = false;
			sidebar_menu_submenu_wrapper.classList.remove('open');
			subMenuRotate = false;
			enableBodyScroll(sidebar_menu_list);
			content_overlapping.style.display = 'none';
		}
	});

	sidebar_menu_link.addEventListener('click', () => {
		if (!subMenuRotate) {
			sidebar_menu_submenu_wrapper.classList.add('open');
			subMenuRotate = true;
		} else {
			sidebar_menu_submenu_wrapper.classList.remove('open');
			subMenuRotate = false;
		}
	});
	sidebar_menu_shop_back.addEventListener('click', () => {
		sidebar_menu_submenu_wrapper.classList.remove('open');
		subMenuRotate = false;
	});

	let last_scroll_position = 0;
	let ticking = false;

	function hideUtilityBar(last_scroll_position) {
		if (last_scroll_position > 0 && last_scroll_position > utility_bar_height) {
			header.style.top = "-" + utility_bar_height + "px";
			sidebar_menu_list.style.height = (window.innerHeight - header_height + utility_bar_height) + "px";
		} else if (last_scroll_position < utility_bar_height) {
			header.style.top = "0";
			sidebar_menu_list.style.height = (window.innerHeight - header_height) + "px";
		} else {
			return 0;
		}
	}

	window.addEventListener('scroll', function (e) {
		last_scroll_position = window.scrollY;
		const deb =  debounce(hideUtilityBar, 1000);

		if (!ticking) {
			window.requestAnimationFrame(function () {
				deb(last_scroll_position);
				ticking = false;
			});

			ticking = true;
		}
	});

	function debounce(f, ms) {
		let isCooldown = false;
		return function() {
			if (isCooldown) return;
			f.apply(this, arguments);
			isCooldown = true;
			setTimeout(() => isCooldown = false, ms);
		};
	}
}());
