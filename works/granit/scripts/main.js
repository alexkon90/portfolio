$(document).ready(function(){
	// Promo svg
	$(".promo-element").bind("mouseover", function(){
		var target = $('#promo-element-' + $(this).data("id"));
		console.log(target)
		$(target).addClass("active");
	});
	$(".promo-element").mouseout(function () {
		$(".promo-element__title").removeClass("active");
	});

	// Menu mobile
	$(".js-menu-btn").on("click", function(){
		$("body").addClass("filter-lock");
		$(".header-menu").addClass("open");
		$(".bg-filter").addClass("active");
	});
	$(".bg-filter").on("click", function(){
		$(this).removeClass("active");
		$("body").removeClass("filter-lock");
		$(".header-menu, .dropdown").removeClass("open");
	});

	$(".js-dropdown-btn").on("click", function(e){
		e.preventDefault();
		$(".dropdown").addClass("open");
	});
	$(".js-dropdown-back").on("click", function(){
		$(".dropdown").removeClass("open");
	});
	$(".dropdown-section__expand").on("click", function(){
		$(this).toggleClass("active");
		$(this).parents("ul").find(".menu-hidden").toggleClass("menu-show");
	});

	// Menu
	if ($(window).width() < 1260) {
		$(function () {
		    let el = $('.dropdown-section__title');
		    $('.dropdown-section:has(".dropdown-section-wrap")').addClass('has-dropdown');
		    el.click(function() {
		        let checkedElement = $(this).next(),
		            visibleElement = $('.dropdown-section-wrap:visible');
		            
		        visibleElement.stop().animate({'height':'toggle'}, 300).parent().removeClass('active');     
		        if((checkedElement.is('.dropdown-section-wrap')) && (!checkedElement.is(':visible'))) {
		            checkedElement.stop().animate({'height':'toggle'}, 300).parent().addClass('active');
		            return false;
		        }   
		        if((checkedElement.is('.dropdown-section-wrap')) && (checkedElement.is(':visible'))) {
		            return false;
		        }
		    });
		});
		$(function () {
		    let el = $('.dropdown-section-block__title');
		    $('.dropdown-section-block:has(".dropdown-section-block-content")').addClass('has-dropdown');
		    el.click(function() {
		        let checkedElement = $(this).next(),
		            visibleElement = $('.dropdown-section-block-content:visible');
		            
		        visibleElement.stop().animate({'height':'toggle'}, 300).parent().removeClass('active');     
		        if((checkedElement.is('.dropdown-section-block-content')) && (!checkedElement.is(':visible'))) {
		            checkedElement.stop().animate({'height':'toggle'}, 300).parent().addClass('active');
		            return false;
		        }   
		        if((checkedElement.is('.dropdown-section-block-content')) && (checkedElement.is(':visible'))) {
		            return false;
		        }
		    });
		});
	}

	// Timer
	let clock = $('#timer').FlipClock({
	    countdown: true,
	    clockFace: 'DailyCounter',
		language:'ru-ru', 
	});
	let now = new Date();
	let test = new Date('2026/03/20 00:00:00');
	clock.setTime((test.getTime() - now.getTime()) / 1000); 
	clock.start();

	// Catalog filter mobile
	$(".js-filter-btn").on("click", function(){
		$("body").addClass("filter-lock");
		$(".catalog-filter").addClass("open");
		$(".bg-filter").addClass("active");
	});

	$(".bg-filter, .catalog-filter__close").on("click", function(){
		$("body").removeClass("filter-lock");
		$(".catalog-filter").removeClass("open");
		$(".bg-filter").removeClass("active");
	});

	// Sticky
	if($('.product-rightside-body').length > 0){
		let w =  $(window).outerWidth();
		if(w > 1260){
			$('.product-rightside-body').stick_in_parent();
		}
	}

	// Product stats show
	$(".product-stats__all").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parents(".product-stats").toggleClass("show-all");
	});

	// Search
	$(".js-header-search-btn").on("click", function(){
		$(this).toggleClass("active");
		$(".header-search-body").toggleClass("open");
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".header-search *")) {
			$('.js-header-search-btn').removeClass('active');
			$(".header-search-body").removeClass("open");
		};
	});
	$(".js-mobile-search-btn").on("click", function(){
		$(this).toggleClass("active");
		$(".mobile-search-body").toggleClass("open");
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".mobile-search *")) {
			$('.js-mobile-search-btn').removeClass('active');
			$(".mobile-search-body").removeClass("open");
		};
	});

	// Sticky
	$(".js-sticky-btn").on("click", function(event){
		event.preventDefault();
		$(this).toggleClass('active');
		$("body").toggleClass("has-sticky");
		$(".sticky").toggleClass("open");
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".sticky *")) {
			$('.js-sticky-btn').removeClass('active');
			$("body").removeClass("has-sticky");
			$(".sticky").removeClass("open");
		};
	});

	// Ceo hidden text
	$(".ceo-text__more").on("click", function(e){
		e.preventDefault();
		$(this).hide();
		$(this).parents(".ceo-text").find(".ceo-text__hidden, .ceo-text__mobilehidden").css("display", "block");
	});

	// Phone mask
	$(".input_mask").inputmask("+7 (999) 999 99 99");

	// Tabs
	$(function() {
		$('.tabs-list').each(function() {
			$(this).find('.tabs__btn').each(function(i) {
				$(this).click(function(){
					$(this).addClass('active').siblings().removeClass('active').parents('.tabs').find('.tabs-section').removeClass('active').eq(i).addClass('active');
					$(this).parents('.tabs').find(".products-carousel").slick('reinit');
					$(this).parents('.mainreviews').find(".slick-slider").slick('reinit');
				});
			});
		});
	});

	// Sticky cart tabs
	$(function() {
		$('.sticky-cart-tabs-buttons').each(function() {
			$(this).find('.sticky-cart-tabs__btn').each(function(i) {
				$(this).click(function(){
					$(this).addClass('active').siblings().removeClass('active').closest('.sticky').find('.sticky-cart-form-section').removeClass('active').eq(i).addClass('active');
					$(".sticky-cart-scroll").getNiceScroll().resize();
				});
			});
		});
	});

	// Custom Select
	$(".select-options-inside").niceScroll({
		autohidemode: false,
		cursorborder: false,
		railpadding:{top:5, right:10, left:0, bottom:0}
	});
	$('.select').click(function(event) {
		if(!$(this).hasClass('disabled')){
			$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
			$(this).toggleClass('active');
			$(this).find('.select-options').slideToggle(50,function() {
				$(".select-options-inside").getNiceScroll().resize();
			});
		}
	});
	$('.select-options__value').click(function() {
		$(this).parents('.select').find('.select-title__value').html($(this).html());
		if($.trim($(this).data('value'))!=''){
			$(this).parents('.select').find('input').val($(this).data('value'));
		}else{
			$(this).parents('.select').find('input').val($(this).html());
		}
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
			$('.select-options').slideUp(50,function() {
				$(".select-options-inside").getNiceScroll().resize();
			});
		};
	});

	// Change quantity
	$('.quantity__btn').click(function(event) {
		let n=parseInt($(this).parent().find('.quantity__value input').val());
		if($(this).hasClass('btn-minus')){
			n=n-1;
			if(n<1){n=1;}
		}else{
			n=n+1;
		}
		$(this).parent().find('.quantity__value input').val(n);
		return false;
	});

	// Nicescroll
	$(".nicescroll").niceScroll({
		autohidemode: false,
		cursorborder: false,
		railpadding:{top:0, right:0, left:0, bottom:0}
	});

	// Catalog filter select
	$(".catalog-filter-item-scroll").niceScroll({
		autohidemode: false,
		cursorborder: false,
		railpadding:{top:5, right:10, left:0, bottom:0}
	});

	$('.catalog-filter-item__title').click(function(event) {
		$('.catalog-filter-item__title').not(this).parents(".catalog-filter-item").find('.catalog-filter-item-dropdown').slideUp(200);
		$(this).parents(".catalog-filter-item").find('.catalog-filter-item-dropdown').slideToggle(200, function() {
			$(".catalog-filter-item-scroll").getNiceScroll().resize();
		});
	});
	$('.filter-sort__value').click(function() {
		$(this).parents('.catalog-filter-item').find('.catalog-filter-item__title span').html($(this).html());
		$(this).parents(".catalog-filter-item").find('.catalog-filter-item-dropdown').slideUp(200,function() {
			$(".catalog-filter-item-scroll").getNiceScroll().resize();
		});
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".catalog-filter-item *")) {
			$('.catalog-filter-item').removeClass('active');
			$('.catalog-filter-item-dropdown').slideUp(200,function() {
				$(".catalog-filter-item-scroll").getNiceScroll().resize();
			});
		};
	});

	// Cart show
	$(".cart-table-product-add__switcher").on("click", function(event){
		$(".cart-table-product-add-content").slideToggle(200);
	});

	// Add to wishlist
	$(".product-wish").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("active");
	});	
	$(".products-item__wishlist").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("active");
	});	

	// Product matertial
	$(".product-material__item").on("click", function(e){
		$(".product-material__item").removeClass("active");
		$(this).addClass("active");
	});	

	// Product service
	$(".product-service-item").on("click", function(e){
		e.preventDefault();
		$(this).parents(".product-service").find(".product-service-item").removeClass("active");
		$(this).addClass("active");
	});	

	// Product service
	$(".product-service-top").on("click", function(){
		$(this).parents(".product-service").toggleClass("active");
		$(this).parents(".product-service").find(".product-service-content").slideToggle();
		$(this).parents('.product-service').find(".slick-slider").slick('reinit');
	});	

	// Mobile total
	$(".product-total__toggle").on("click", function(){
		$(this).toggleClass("active");
		$(".product-include").slideToggle();
	});

	$(".decor-product-total__toggle").on("click", function(){
		$(this).toggleClass("active");
		$(".decor-product-include").slideToggle();
	});

	// Product service tabs
	$(function() {
		$('.product-service-tabs-list').each(function() {
			$(this).find('.product-service-tabs__btn').each(function(i) {
				$(this).click(function(){
					$(this).addClass('active').siblings().removeClass('active').parents('.product-service-tabs').find('.product-service-tabs-section').removeClass('active').eq(i).addClass('active');
					$(this).parents('.product-service').find(".products-service-carousel").slick('reinit');
				});
			});
		});
	});

	// Price slider
	if($('.price-slider').length > 0){
		$(".price-slider").slider({
			range: true,
			min: 0,
			max: 250000,
			values: [0, 145000],
			slide: function(event, ui) {
				$(".price-slider__min").val(ui.values[0]);
				$(".price-slider__max").val(ui.values[1]);
			}
		});
		$(".price-slider__min").val($(".price-slider").slider("values", 0));
		$(".price-slider__max").val($(".price-slider").slider("values", 1));

		$(".price-slider__min").change(function() {
			$(".price-slider").slider("values", 0, $(this).val());
		});
		$(".price-slider__max").change(function() {
			$(".price-slider").slider("values", 1, $(this).val());
		})
	}

	// Scroll
	$(".scroll").niceScroll({
		autohidemode: false,
		cursorborder: false,
		railpadding:{top:0, right:0, left:0, bottom:0}
	});

	// Decor data epitaph tabs
	$(function() {
		$('.decor-data-epitaph-tabs-list').each(function() {
			$(this).find('.decor-data-epitaph-tabs__btn').each(function(i) {
				$(this).click(function(){
					$(this).addClass('active').siblings().removeClass('active').parents('.decor-data-epitaph-tabs').find('.decor-data-epitaph-tabs-section').removeClass('active').eq(i).addClass('active');
					$(this).parents(".decor-data-epitaph-section").find(".scroll").getNiceScroll().resize();
				});
			});
		});
	});

	// Product decor
	$(".decor-data-scroll").niceScroll({
		autohidemode: false,
		cursorborder: false,
		railpadding:{top:0, right:0, left:0, bottom:0}
	});
	$(".decor-section-top").on("click", function(){
		$(this).parents(".decor-section").toggleClass("active");
		$(this).parents(".decor-section").find(".decor-section-content").slideToggle();
		$(this).parents(".decor-section").find(".decor-data-scroll").getNiceScroll().resize();
	});	

	// 
	$(".decor-portrait-item__toggle").on("click", function(){
		$(this).parents(".decor-portrait-item").toggleClass("active");
		$(this).parents(".decor-portrait-item").find(".decor-portrait-item-content").slideToggle();
	});	


	// Fancybox
	if($('.fancybox').length > 0){
		$(".fancybox").fancybox({
			loop : false,
			arrows : true,
			buttons : [
				'thumbs',
				'close'
			],
		});
	}

	// Discounts slider
	if($('.discounts-slider').length > 0){
		$('.discounts-slider').slick({
			arrows: false,
			dots: true,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
		});
	}

	// Products carousel
	if($('.products-carousel').length > 0){
		$('.products-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1010,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 639,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
				}
			}]
		});
	}

	// Mainworks slider
	if($('.mainworks-slider').length > 0){
		$('.mainworks-slider').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 639,
				settings: {
					adaptiveHeight: true,
					arrows: false,
					dots: true,
				}
			}]
		});
	}

	// Mainreviews carousel
	if($('.mainreviews-carousel').length > 0){
		$('.mainreviews-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 5,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	}

	// Mainreviews carousel 2
	if($('.mainreviews-carousel2').length > 0){
		$('.mainreviews-carousel2').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
		});
	}

	// Mainreviews carousel 3
	if($('.mainreviews-carousel3').length > 0){
		$('.mainreviews-carousel3').slick({
			arrows: true,
			dots: false,
			slidesToShow: 3,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	}

	// Mainreviews carousel 4
	if($('.mainreviews-carousel4').length > 0){
		$('.mainreviews-carousel4').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 111,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	}

	// Articles other carousel
	if($('.articles-other-carousel').length > 0){
		$('.articles-other-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1010,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
					adaptiveHeight: true,
				}
			}]
		});
	}

	// Work carousel
	if($('.work-slider').length > 0){
		$('.work-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			asNavFor: '.work-thumbs',
			responsive: [
			{
				breakpoint: 639,
				settings: {
					dots: true,
				}
			}]
		});
		$('.work-thumbs').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.work-slider',
			dots: false,
			variableWidth: true,
			focusOnSelect: true
		});
	}

	// Cemetery products carousel
	if($('.cemetery-products-carousel').length > 0){
		$('.cemetery-products-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1010,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
					adaptiveHeight: true,
				}
			}]
		});
	}

	// Cemetery products carousel
	if($('.product-works-carousel').length > 0){
		$('.product-works-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1010,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
					adaptiveHeight: true,
				}
			}]
		});
	}

	// Product slider
	if($('.product-slider').length > 0){
		$('.product-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			asNavFor: '.product-thumbs',
			responsive: [
			{
				breakpoint: 1010,
				settings: {
					dots: true,
				}
			}]
		});
		$('.product-thumbs').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.product-slider',
			dots: false,
			variableWidth: true,
			focusOnSelect: true
		});
	}

	// Cemetery products carousel
	if($('.product-service-carousel').length > 0){
		$('.product-service-carousel').slick({
			arrows: true,
			dots: false,
			slidesToShow: 3,
			accessibility: false,
			autoplaySpeed: 3000,
			variableWidth: true,
			responsive: [
			{
				breakpoint: 1010,
				settings: {
					variableWidth: false,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 767,
				settings: {
					variableWidth: false,
					slidesToShow: 1,
				}
			}]
		});
	}

	// Modals
	$(".js-callback").on("click", function(event){
		event.preventDefault();
		$.fancybox.open({
			src  : "#modal-callback",
			closeExisting: true,
			baseClass: "dark__bg",
			touch: false,
			transitionEffect: "circular",
		});
	});

	$(".js-click").on("click", function(event){
		event.preventDefault();
		$.fancybox.open({
			src  : "#modal-click",
			closeExisting: true,
			baseClass: "dark__bg",
			touch: false,
			transitionEffect: "circular",
		});
	});

	$(".js-btn-view").on("click", function(event){
		event.preventDefault();
		$.fancybox.open({
			src  : "#modal-product",
			closeExisting: true,
			baseClass: "dark__bg",
			touch: false,
			transitionEffect: "circular",
		});
	});

	// Up
	$(window).scroll(function() {
		if($(window).scrollTop() > 200){
			$('#up').fadeIn(300);
		}else{
			$('#up').fadeOut(300);
		}
	});
	$('#up').click(function(event) {
		$('body,html').animate({scrollTop:0},300);
	});
});