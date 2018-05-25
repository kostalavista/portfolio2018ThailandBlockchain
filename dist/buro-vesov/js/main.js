$( document ).ready(function() {
	$(".footer").load("footer.html");
	$(".header-group").load("header-group.html", function() {
		$( window ).resize(function() {
			$('.main-nav-group__items').attr('style', '');

			toggle_top_menu();
		});

		$('.menu-icon').on('click', function() {
			$('.main-nav-group__items').slideToggle('slow', 'swing');
		});

		$('.search-input-group__close').on('click', function() {
			$(this).siblings('.search-input').val('');
			$(this).hide();
		});

		$('.city-select, .cities__close').on('click', function() {
			$('body').toggleClass('g-overflow-hidden');
			$('.cities').slideToggle('slow', 'swing');
			$('.city-select__arrow').toggleClass('g-rotate-180');
		});

		$('.phone').on('click', function() {
			$(this).find('.phone__hint').slideToggle('slow', 'swing');
			$(this).find('.arrow-down').toggleClass('g-rotate-180');
		});

		$('.js-popup-callback').on('click', function() {
			$('.popup-callback').fadeIn();
		});

		$('.popup-callback__close, .popup-callback__overlay').on('click', function() {
			$('.popup-callback').fadeOut();
		});

		//Side nav
		$('.side-nav-group__action').on('click', function() {
			$('.side-nav').slideToggle(500, 'swing');
			$('.filter').toggleClass('filter_open');
			$('.side-nav-hint').stop(true, true).hide();
			$('.side-nav__item_active').removeClass('side-nav__item_active');
		});

		$('.js-side-nav__item:not(.side-nav__item_active)').hover( function() {
			$(this).siblings().removeClass('side-nav__item_active');
			$(this).addClass('side-nav__item_active');
			$('.side-nav-hint').fadeOut(200, function () {
				$('.side-nav-hint').fadeIn(200);
			});
		}, function () {
			var $self = $(this);
			setTimeout(function () {
				if ( $self.hasClass('side-nav__item_active') && !$('.side-nav-hint').hasClass('side-nav-hint_hover') ) {
					$('.side-nav-hint').fadeOut(100, function () {
						$self.removeClass('side-nav__item_active');
					})
				}
			}, 500);
		});

		$('.side-nav-hint').hover(function () {
			$('.side-nav-hint').addClass('side-nav-hint_hover');
		}, function(){
			$('.side-nav-hint').fadeOut('fast', function () {
				$('.side-nav-hint').removeClass('side-nav-hint_hover');
				$('.side-nav__item_active').removeClass('side-nav__item_active');
			})
		});


		$('.drop-down__title').on('click', function() {
			$(this).siblings('.drop-down__content').toggle('slow', 'swing');
			$(this).find('.arrow-down').toggleClass('g-rotate-180');
		});

		// Validation
		$('.btn-request').on('click', function() {
			var $phone = $(this).parents('form').find('input[name="phone"]');

			if ( $phone.length && !$phone.val() ) {
				$phone.attr('placeholder', 'Обязательное для заполнения');
				$phone.focus();
				return false;
			}
		});

		$('input[name="phone"]').focusout(function() {
			$(this).attr('placeholder', 'Ваш телефон');
		});

		$('.tab-list__item').on('click', function() {
			var index = $('.tab-list__item').index(this);

			$('.tab-list__item').removeClass('tab-list__item_active');
			$('.tab-list__text').removeClass('tab-list__text_active');
			$('.nav-tab-content__item').removeClass('nav-tab-content__item_active');

			$('.tab-list__item:eq(' + index + ')').addClass('tab-list__item_active');
			$('.tab-list__text:eq(' + index + ')').addClass('tab-list__text_active');
			$('.nav-tab-content__item:eq(' + index + ')').addClass('nav-tab-content__item_active');
		});

		//Rating
		$('.rating__icon')
		.hover( function() {
				$(this).siblings('.rating__icon_active-voted')
				.removeClass('rating__icon_active-voted')
				.addClass('js-last-vote');

				$(this).addClass('rating__icon_active');

			}, function() {
				$(this).siblings('.js-last-vote')
				.removeClass('js-last-vote')
				.addClass('rating__icon_active-voted');

				$(this).removeClass('rating__icon_active');
			}
		)
		.on('click', function() {
			$(this).siblings('.js-last-vote').removeClass('js-last-vote');
			$(this).siblings('.rating__icon_active-voted').removeClass('rating__icon_active-voted');
			$(this).addClass('rating__icon_active-voted');
		});

		//Fixed top menu
		$(window).scroll(function(){
			toggle_top_menu();
		});
		toggle_top_menu();

		function toggle_top_menu() {
			if(document.body.scrollTop > 65 && $(window).width() > 1000) {
				$('.main-nav-group').addClass('g-margin-bottom-75');
				$('.js-nav-fixed').addClass('fixed-top-menu');
				//Если на странице нету фильтра
				if ( !$('div').is('.filter') || ( $('div').is('.filter') && 1650 > $(window).width() ) ) {
					$('.side-nav-group__inner_wrap').addClass('side-nav_fixed');
					$('.side-nav').addClass('scroll-holder_scrolled');
				}
			}
			else {
				$('.main-nav-group').removeClass('g-margin-bottom-75');
				$('.js-nav-fixed').removeClass('fixed-top-menu');
				$('.side-nav-group__inner_wrap').removeClass('side-nav_fixed');
				$('.side-nav').removeClass('scroll-holder_scrolled');
			}
		}

		//Search
		$('.search-input').on('input', function() {
			if ( $(this).val() != '' ) {
				$(this).siblings('.search-input-group__close').show();
			} else {
				$(this).siblings('.search-input-group__close').hide();
			}
		});

		//Filter range
		$(".js-filter-slider").slider({
			step: 500,
			min: 0,
			max: 100000,
			values: [10000,90000],
			range: true,
			stop: function() {
				$("input#minCost").val($(".js-filter-slider").slider("values",0) + "р");
				$("input#maxCost").val($(".js-filter-slider").slider("values",1) + "р");
			},
			slide: function(){
				$("input#minCost").val($(".js-filter-slider").slider("values",0) + "р");
				$("input#maxCost").val($(".js-filter-slider").slider("values",1) + "р");
			}
		});

		$("input#minCost").change(function(){
			var value1=$("input#minCost").val();
			var value2=$("input#maxCost").val();

			if(parseInt(value1) > parseInt(value2)){
				value1 = value2;
				$("input#minCost").val(value1);
			}
			$(".js-filter-slider").slider("values",0,value1 + "р");
		});


		$("input#maxCost").change(function(){
			var value1=$("input#minCost").val();
			var value2=$("input#maxCost").val();

			if (value2 > 100000) { value2 = 100000; $("input#maxCost").val(100000)}

			if(parseInt(value1) > parseInt(value2)){
				value2 = value1;
				$("input#maxCost").val(value2);
			}
			$(".js-filter-slider").slider("values",1,value2 + "р");
		});

		//Filter clear
		$('.js-filter-clear').on('click', function() {
			$(this).parents("form")[0].reset();
			$(this).parents("form").find(".ui-slider-range").attr("style", "left: 10%; width: 80%;");
			$(this).parents("form").find(".ui-state-default:first").attr("style", "left: 10%;");
			$(this).parents("form").find(".ui-state-default:last").attr("style", "left: 90%;");
		});

		//Filter toggle
		$('.js-toggle-filter-action').on('click', function() {
			$('.js-toggle-filter').slideToggle();
		});

		//Scroll to top
		$(window).scroll(function() {
			var top_now = $(this).scrollTop();
			var height = $(this).height();
			if (top_now > height * 1.5) {
				$('.slide-to-top').show();
			}
			else $('.slide-to-top').hide();
		});
		$('.js-to-top').click(function() {
			$('html, body').animate({scrollTop: 0},500);
		});

		$('.filter__input-group label').on('click', function() {
			var offset = $(this).position().top;
			$('.filter-hint_absolute').css('top', offset - 24);
			$('.filter-hint').addClass('filter-hint_show');
		});

	});
});