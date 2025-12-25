$(document).ready(function(){
	// Fullpage
	$('#fullpage').fullpage({
		autoScrolling: true,
		responsiveWidth: 1280,
		scrollOverflow: true
	});

	// Fixed header on scroll
	$(window).scroll(function(){
	    if ($(window).scrollTop() >= 10) {
	       $('.header').addClass('header_fixed');
	    }
	    else {
	       $('.header').removeClass('header_fixed');
	    }
	});

	// Phone mask
	$(".input_mask").inputmask("+7 (999) 999 99 99");

	// Меnu
	$(".header-menu-switcher-wrap").click(function(){
		$(this).toggleClass("active");
		$(".header-menu").toggleClass("open");
	});
	$("#fp-nav a").click(function(){
		$(".header-menu-switcher-wrap").removeClass("active");
		$(".header-menu").removeClass("open");
	});
	$(document).click(function(e) {
		if (!$(e.target).is(".header-menu-switcher-wrap, .header-menu-switcher-wrap *, .header-menu, .header-menu *")) {
			$(".header-menu-switcher-wrap").removeClass("active");
			$(".header-menu").removeClass("open");
		};
	});

	// FAQ
	$(function () {
	    var el = $('.news-item__title');
	    el.click(function() {
	        var checkedElement = $(this).next(),
	            visibleElement = $('.news-item-desc:visible');
	            
	        visibleElement.stop().animate({'height':'toggle'}, 300).parent().removeClass('active');     
	        if((checkedElement.is('.news-item-desc')) && (!checkedElement.is(':visible'))) {
	            checkedElement.stop().animate({'height':'toggle'}, 300).parent().addClass('active');
	            return false;
	        }   
	        if((checkedElement.is('.news-item-desc')) && (checkedElement.is(':visible'))) {
	            return false;
	        }
	    });
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

	// Auth modals
	$(".js-modal-sign").on("click", function(event){
		event.preventDefault();
		$.fancybox.open({
			src  : "#modal-sign",
			closeExisting: true,
			baseClass: "dark__bg",
			touch: false,
			transitionEffect: "circular",
		});
	});

	// Building slider
	$('.building-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		draggable: false,
		swipe: false,
		asNavFor: '.building-thumbs',
		responsive: [
		{
			breakpoint: 576,
			settings: {
			    adaptiveHeight: true
			}
		}]
	});

	$('.building-thumbs').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.building-slider',
		dots: false,
		arrows: false,
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				// infinite: false,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
			}
		}]
	});			

	// Arboretum slider
	$('.arboretum-slider').slick({
		//autoplay: true,
		//infinite: false,
		//speed: 500,
		arrows: true,
		dots: false,
		slidesToShow: 2,
		accessibility: false,
		autoplaySpeed: 3000,
		variableWidth: true,
		centerMode: true,
		responsive: [
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				variableWidth: false,
				centerMode: false,
			}
		}]
	});

	// Services-carousel
	$('.services-carousel').slick({
		//autoplay: true,
		//infinite: false,
		//speed: 500,
		arrows: true,
		dots: false,
		slidesToShow: 4,
		accessibility: false,
		autoplaySpeed: 3000,
		variableWidth: true,
		centerMode: true,
		responsive: [
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				variableWidth: false,
				centerMode: false,
			}
		}]
	});

	// Form
	$("form").submit(function() {
		var formID = $(this).attr('id'); 
		var formNm = $('#' + formID);
	  $.ajax({
	    type: "POST",
	    url: "php/telegram.php",
	    data: formNm.serialize(),
	    success: function(html) {
	    	$.fancybox.open({
	    		src  : "#modal-thanks",
	    		closeExisting: true,
	    		baseClass: "dark__bg",
	    		touch: false,
	    		transitionEffect: "circular",
	    	});
	    }
	  });

	  $('form').trigger("reset");
	  return false;
	});

	if ($.browser.msie) {
	  $("form").find("input[type='text']").each(function() {
	    var tp = $(this).attr("placeholder");
	    $(this).attr('value', tp).css('color', '#373533');
	  }).focusin(function() {
	    var val = $(this).attr('placeholder');
	    if ($(this).val() == val) {
	      $(this).attr('value', '').css('color', '#373533');
	    }
	  }).focusout(function() {
	    var val = $(this).attr('placeholder');
	    if ($(this).val() == "") {
	      $(this).attr('value', val).css('color', '#373533');
	    }
	  });

	  /* Protected send form */
	  $("form").submit(function() {
	    $(this).find("input[type='text']").each(function() {
	      var val = $(this).attr('placeholder');
	      if ($(this).val() == val) {
	        $(this).attr('value', '');
	      }
	    })
	  });
	}
}); 