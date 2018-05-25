$(document).ready(function() {
	if (document.documentElement.clientWidth < 1170) {
		$("*").removeClassWild("revealator*");
	}

	$(window).scroll(function() {
		if( $(window).scrollTop() >= 10 ) {
			$(".js-header").removeClass("header_top")
		} else {
			$(".js-header").addClass("header_top")
		}
	});

	$(".js-toggle-nav").click(function () {
		$(".js-nav").toggleClass("nav_hidden");
	});

	$(".js-menu-mob").click(function () {
		$(".nav-group-mob").toggleClass("nav-group-mob_open");
	});

	//подставить нужный слайдер по клику
	$(".product__item").click(function () {
		var src = $(this).attr('src');
		var num = src.substr(src.length - 5, 1);
		$(".product .slider").hide();
		$(".product .slider" + num).fadeIn();
	});
	//для моб
	$(".product-mob__block").click(function () {
		var src = $(this).find(".product-mob__img").attr("src");
		var num = src.substr(src.length - 5, 1);
		$(".product .slider").hide();
		$(".product__center-wrap").addClass("popup_active");
		$(".product .slider" + num).show();
	});

	//закрыть все попапы
	$(".popup__close, .js-make-call-basket").click(function () {
		$(".make-call, .make-call-details, .make-call-basket, .product__center-wrap").removeClass("popup_active");
	});

	//открыть попап
	$(".js-make-call").click(function () {
		$(".make-call").addClass("popup_active");
	});
	$(".js-make-call-details").click(function () {
		$(".make-call-details").addClass("popup_active");
	});
	$(".js-make-call-basket").click(function () {
		buildBasket();
		$(".make-call-basket").addClass("popup_active");
	});

	//увеличение/уменьшение кол-ва продуктов для помещения в корзину
	$(".product-count-down").click( function () {
		var $count = $(this).parent().find(".product-count");
		var count = $count.text();
		if (count > 1) {
			count--;
			$count.text(count);
		}
	});
	$(".product-count-up").click( function () {
		var $count = $(this).parent().find(".product-count");
		var count = $count.text();
		count++;
		$count.text(count);
	});

	$(".js-select-model").click( function () {
		var selectModelOffset = $("#nav3").offset().top - 110;
		$('html, body').stop().animate({
			scrollTop: selectModelOffset
		}, 300);
	});

	//отправка письма
	$("form").submit(function () {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function (e) {
			console.log(e);
			alert("Спасибо! Наши менеджеры свяжутся с Вами в ближайшее время.");
		});
		$(".make-call, .make-call-details, .make-call-basket, .product__center-wrap").removeClass("popup_active");
		return false;
	});

});
//подсветка навигации
var lastId, topMenu, topMenuHeight, menuItems;

if (document.documentElement.clientWidth > 1170) {
	topMenu = $(".header-desc");
	topMenuHeight = topMenu.outerHeight()+15;
	menuItems = $("#nav-desc a");
} else {
	topMenu = $(".header-mob");
	topMenuHeight = topMenu.outerHeight()+15;
	menuItems = $(".nav-mob a");
}

var offsetFirst = $('#nav1').offset().top-topMenuHeight+1;

var scrollItems = menuItems.map(function(){
	var item = $($(this).attr("href"));
	if (item.length) { return item; }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
	$(".nav-group-mob").removeClass("nav-group-mob_open");
	var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;

	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 300);
	e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
	var fromTop = $(this).scrollTop()+topMenuHeight;

	var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop)
			return this;
	});
	cur = cur[cur.length - 1];
	var id = cur && cur.length ? cur[0].id : "";

	if (lastId !== id) {
		lastId = id;
		if (document.documentElement.clientWidth > 1170) {
			$(".nav__item").removeClass("nav__item_active");
			$("[href='#"+id+"'] .nav__item").addClass("nav__item_active");
		} else {
			$(".nav-mob__text").removeClass("nav-mob__text_active");
			$("[href='#"+id+"'] .nav-mob__text").addClass("nav-mob__text_active");
		}

	}

	if(fromTop < offsetFirst) {
		$(".nav__item_first").addClass("nav__item_first-active");
	} else {
		$(".nav__item_first").removeClass("nav__item_first-active");
	}
});

//удаление анимации для моб
(function($) {
	$.fn.removeClassWild = function(mask) {
		return this.removeClass(function(index, cls) {
			var re = mask.replace(/\*/g, '\\S+');
			return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
		});
	};
})(jQuery);