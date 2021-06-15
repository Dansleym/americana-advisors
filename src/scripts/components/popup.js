// ;(function() {
// 	/* Custom Events */
//
// 	$(document).on('popup:open', function(e, popup, popupId) {
// 		console.log(popupId, ' POPUP is open');
// 	});
//
// 	$(document).on('popup:close', function(e, popup, popupId) {
// 		console.log(popupId, ' POPUP is close');
// 		bodyScrollLock.clearAllBodyScrollLocks();
// 	});
//
//
//
//
// 	/* Custom POPUP */
//
// 	let popupLinks = $('.js-open-popup');
// 	let popupOpenClass = 'popup--open';
// 	let popupCloseButton = $('.js-close-popup');
//
//
// 	popupLinks.on('click', function(e) {
// 		e.preventDefault();
//
// 		let popupId = $(this).attr('data-popup-id');
// 		let popup = $('#' + popupId);
// 		let youtubeLink = $(this).attr('data-popup-youtube');
//
// 		if (popup.length < 1) {
// 			console.log('Popup not found');
// 			return;
// 		}
//
// 		if (youtubeLink) {
// 			let youtubeVideoId = youtube_id_parser(youtubeLink);
//
// 			console.log(youtubeVideoId);
// 			let iframe = `	<div class="popup__iframe-wrapper">
// 								<iframe
// 									src="https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&controls=1&fs=1&iv_load_policy=3&autoplay=1&mute=0&rel=0&showinfo=0&loop=0&start=0"
// 									frameborder="0"
// 									allow="autoplay"
// 									allowfullscreen
// 								>
// 								</iframe>
// 							</div>
// 						 `;
//
// 		 	$(document).trigger('popup:open', [popup, popupId]);
//
// 			popup.find('.popup__content').append(iframe);
//
// 			popup.addClass(popupOpenClass);
// 			bodyScrollLock.disableBodyScroll(popup[0]);
//
// 		} else {
// 			$(document).trigger('popup:open', [popup, popupId]);
//
// 			popup.addClass(popupOpenClass);
// 			bodyScrollLock.disableBodyScroll(popup[0]);
// 		}
// 	});
//
// 	popupCloseButton.on('click', function(e) {
// 		let popup = $(this).parents('.js-popup');
// 		let popupId = popup.attr('id');
//
// 		$(document).trigger('popup:close', [popup, popupId]);
// 		popup.removeClass(popupOpenClass);
//
// 		if (popup.find('.popup__iframe-wrapper').length > 0) {
// 			popup.find('.popup__iframe-wrapper').remove();
// 		}
// 	});
//
//
// 	function youtube_id_parser(url){
// 		/* Return the youTube video ID */
//
// 		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
// 		var match = url.match(regExp);
// 		return (match&&match[7].length==11)? match[7] : false;
// 	}
//
// }());
