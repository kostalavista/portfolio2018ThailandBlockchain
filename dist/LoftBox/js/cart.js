$(document).ready(function() {
	//Добавить в корзину
	$(".js-add-to-cart").click(function () {
		var id = parseInt(Math.random() * 1000000);
		var src = $(this).parent().parent().find(".slide img").attr("src");
		var title = $(this).parent().find(".product__title").text();
		var color = $(this).parent().find(".select option:selected").text();
		var count = $(this).parent().find(".product-count").text();
		var price = $(this).parent().find(".product__price").text();

		addToCart([id, src, title, color, count, price]);
		selectIconBusket();
	});

	//выбираем иконку корзины
	selectIconBusket();
});

function selectIconBusket() {
	var countProduct = getCartArray() ? getCartArray().length : 0;
	var countAll = 0;

	if(countProduct > 0) {
		for( var i = 0; i < countProduct; i++ ) {
			countAll += +getCartArray()[i][4];
		}
		$(".cart-icon_active").removeClass("cart-icon_active");
		$(".cart-full").addClass("cart-icon_active");
		$(".cart-full__count").text(countAll);
	} else {
		$(".cart-icon_active").removeClass("cart-icon_active");
		$(".cart-empty").addClass("cart-icon_active");
	}
}

function addToCart(product) {
	var cart = getCartArray() ? getCartArray() : [];
	cart[cart.length] = product;

	setCartArray(cart);
}

function getCartArray() {
	return JSON.parse(localStorage.getItem("cart"));
}

function setCartArray(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function removeCartById(id) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	for( var i = 0; i < cart.length; i++) {
		if (cart[i][0] == id) {
			cart.splice(i, 1);
			localStorage.removeItem("cart");
			setCartArray(cart);
		}
	}
}

function buildBasket() {
	var cart = getCartArray();
	var allCount = 0;
	var priceProducts = 0;
	var priceDelivery = 290;

	if (cart && cart.length > 0) {
		$('.basket__product').html('');

		for( var i = 0; i < cart.length; i++ ) {
			var id = cart[i][0];
			var src = cart[i][1];
			var title = cart[i][2];
			var color = cart[i][3];
			var count = cart[i][4];
			var price = cart[i][5];

			var cartHTML =
				'<input name="title[]" type="hidden" value="' + title + '">' +
				'<input name="color[]" type="hidden" value="' + color + '">' +
				'<input name="count[]" type="hidden" value="' + count + '">' +
				'<input name="price[]" type="hidden" value="' + price + '">' +
				'<div class="basket__item">' +
				'	<img class="basket__img" src="' + src + '">' +
				'	<div class="basket__block">' +
				'		<div class="basket__title-group">' +
				'		<div class="basket__title">' + title + '</div>' +
				'		<img class="basket__close js-remove-from-basket" src="img/close-mini.png" data-id="' + id + '">' +
				'	</div>' +
				'	<div class="basket__color">' + color + '</div>' +
				'		<div class="basket__price-item">' +
				'			<div class="product__count basket__count">' +
				'				<img data-id="' + id + '" class="product-count-down product-count-down-bask" src="img/arrow_down.png" alt="down">' +
				'				<span class="product-count">' + count + '</span>' +
				'				<img data-id="' + id + '" class="product-count-up product-count-up-bask" src="img/arrow_up.png" alt="up">' +
				'			</div>' +
				'			<div class="basket__price">' + price + '</div>' +
				'		</div>' +
				'	</div>'+
				'</div>';

			$('.basket__product').append(cartHTML);

			allCount += +count;
			priceProducts += count * price.replace(/[^0-9]/gim,'');
		}

		if (allCount == 2) {
			$(".basket__bonus").show();
		} else {
			$(".basket__bonus").hide();
		}

		//иконка корзины
		$(".cart-icon_active").removeClass("cart-icon_active");
		$(".cart-full").addClass("cart-icon_active");
		$(".cart-full__count").text(allCount);

		//увеличение/уменьшение кол-ва продуктов в корзине
		$(".product-count-down-bask").click( function () {
			var $count = $(this).parent().find(".product-count");
			var count = $count.text();
			if (count > 1) {
				count--;
				$count.text(count);
				var id = $(this).attr('data-id');

				var id_new = parseInt(Math.random() * 1000000);
				var src = $(this).parent().parent().parent().parent().find(".basket__img").attr("src");
				var title = $(this).parent().parent().parent().parent().find(".basket__title").text();
				var color = $(this).parent().parent().parent().parent().find(".basket__color").text();
				var count_prod = $(this).parent().parent().parent().parent().find(".product-count").text();
				var price = $(this).parent().parent().parent().parent().find(".basket__price").text();

				removeCartById(id);
				addToCart([id_new, src, title, color, count_prod, price]);
				buildBasket();
			}
		});
		$(".product-count-up-bask").click( function () {
			var $count = $(this).parent().find(".product-count");
			var count = $count.text();
			count++;
			$count.text(count);
			var id = $(this).attr('data-id');

			var id_new = parseInt(Math.random() * 1000000);
			var src = $(this).parent().parent().parent().parent().find(".basket__img").attr("src");
			var title = $(this).parent().parent().parent().parent().find(".basket__title").text();
			var color = $(this).parent().parent().parent().parent().find(".basket__color").text();
			var count_prod = $(this).parent().parent().parent().parent().find(".product-count").text();
			var price = $(this).parent().parent().parent().parent().find(".basket__price").text();

			removeCartById(id);
			addToCart([id_new, src, title, color, count_prod, price]);
			buildBasket();
		});

		//Удалить из корзины
		$(".js-remove-from-basket").click( function () {
			var id = $(this).attr('data-id');
			removeCartById(id);

			if(getCartArray().length == 0) {
			}
			buildBasket();
		});

		//суммы
		$(".basket__price-product span").text(priceProducts + " руб.");
		$(".basket__price-delivery span").text(priceDelivery + " руб.");
		$(".basket__price-total span").text(priceProducts + priceDelivery + " руб.");
	} else {
		$('.basket__product').html('<div class="basket__empty">В корзине пусто</div>');

		//суммы
		$(".basket__price-product span").text("0 руб.");
		$(".basket__price-delivery span").text("0 руб.");
		$(".basket__price-total span").text("0 руб.");

		//иконка корзины
		$(".cart-icon_active").removeClass("cart-icon_active");
		$(".cart-empty").addClass("cart-icon_active");
	}
}
