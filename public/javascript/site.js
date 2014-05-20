$(document).ready(function() {

	// Social Bar

	$('.follow').on('click', function() {
		$('.social-bar').toggleClass('slide');
		$('.site-wrapper').toggleClass('body-slide');
		$('.scrolled-nav').toggleClass('nav-slide');
	});


	// Hidden Nav

	var windowSize = $(window).width();


	if(windowSize > 768) {

		if ($('body').hasClass('home')) {

			$(window).on('scroll load', function() {

				var scrolled = $(window).scrollTop();
				var banner = $('.banner').height();
				var navBar = $('.scrolled-nav');

				if(scrolled > banner) {
					navBar.css('opacity', 1, 'z-index', 400);
				} else {
					navBar.css('opacity', 0, 'z-index', -1);
				}

			});

		}

		if ($('body').hasClass('conference')) {

			$(window).on('scroll load', function() {

				var scrolled = $(window).scrollTop();
				var banner = $('.conf-banner').height();
				var navBar = $('.scrolled-nav');

				if(scrolled > banner) {
					navBar.css('opacity', 1, 'z-index', 400);
				} else {
					navBar.css('opacity', 0, 'z-index', -1);
				}

			});

		}

		if ($('body').hasClass('hackathon')) {

			$(window).on('scroll load', function() {

				var scrolled = $(window).scrollTop();
				var banner = $('.hack-banner').height();
				var navBar = $('.scrolled-nav');

				if(scrolled > banner) {
					navBar.css('opacity', 1, 'z-index', 400);
				} else {
					navBar.css('opacity', 0, 'z-index', -1);
				}

			});

		}

	} else {

	}


	// Mobile Menu

	$('.mobile-show .menu').on('click', function() {
		$('.menu').toggleClass('cross');
		$('.mobile-hide').toggle();
	});

	$('.mobile-hide a.menu-close').on('click', function() {
		$('.mobile-hide').toggle();
		$('.menu').toggleClass('cross');
	});


	// Site Overlay

	$('.overlay-toggle').on('click', function() {
		$('.site-overlay').toggle();
		$('body').toggleClass('body-fixed');
	});

	$('.overlay-close').on('click', function() {
		$('.site-overlay').toggle();
		$('body').toggleClass('body-fixed');
	});


	// Schedule Tabs

	$('.tab-one').on('click', function() {

		$(this).addClass('tab-active');
		$('.tab-two').removeClass('tab-active');

		$('#tab-one').addClass('active');
		$('#tab-two').removeClass('active');

	});

	$('.tab-two').on('click', function() {

		$(this).addClass('tab-active');
		$('.tab-one').removeClass('tab-active');

		$('#tab-two').addClass('active');
		$('#tab-one').removeClass('active');

	});


	// Hackathon Buttons

	$('.api').on('click', function() {
		$('.api-container').addClass('slide-right');
		$('.prize-container').removeClass('slide-left');
		$('body').css('overflow', 'hidden');
	});

	$('.api-close').on('click', function() {
		$('.api-container').removeClass('slide-right');
		$('body').css('overflow', '');
	});




	$('.prize').on('click', function() {
		$('.prize-container').addClass('slide-left');
		$('.api-container').removeClass('slide-right');
		$('body').css('overflow', 'hidden');
	});

	$('.prize-close').on('click', function() {
		$('.prize-container').removeClass('slide-left');
		$('body').css('overflow', '');
	});



	// Smooth Scroll

	$(function() {
			$('a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1000);
					return false;
					}
				}
			});
		});

});
