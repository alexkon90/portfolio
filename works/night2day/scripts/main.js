$(document).ready(function(){
	// Header menu effect
	var $el, leftPos, newWidth;
	$(".header-menu").append("<span id='magic-line'></span>");
    var $magicLine = $("#magic-line");
    $magicLine
        .width($(".current-menu-item").width())
        .css("left", $(".current-menu-item a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $(".header-menu ul li").find("a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });

    // Header menu on mobile
    $(".header-menu__switcher").click(function(){
    	$(this).toggleClass("active");
    	$(".header-menu ul").slideToggle(200);
    });

    // Header search
    $(".header-search__switcher").click(function(){
    	$(this).addClass("active");
    	$(".header-search-form").css("display", "block");
    	$('.header-search-dropown-scroll').jScrollPane({
    		verticalDragHeight: 25,
    		verticalDragWidth: 5,
    	});
    });
    $(document).click(function(e) {
    	if (!$(e.target).is(".header-search *")) {
    		$(".header-search__switcher").removeClass("active");
    		$(".header-search-form").css("display", "none");
    	};
    });

	// Img to background
	$.each($('.ibg'), function(index, val) {
		$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
	});

	// Custom Select
	$('.select').click(function(event) {
		if(!$(this).hasClass('disabled')){
			$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
			$(this).toggleClass('active');
			$(this).find('.select-options').slideToggle(50,function() {
				$('.select-options-inside').jScrollPane({
					verticalDragHeight: 25,
					verticalDragWidth: 5,
				});
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
				$('.select-options-inside').jScrollPane({
					verticalDragHeight: 25,
					verticalDragWidth: 5,
				});
			});
		};
	});

	// Gallery calendar
	$('.event-calendar-row').slick({
		dots: false,
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 30,
		slidesToScroll: 1,
		variableWidth: true,
		// autoplay: true,
		// autoplaySpeed: 5000,
	});

	// Recommend carousel
	$('.recommend-carousel').slick({
		dots: false,
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				}
			},
		]
	});

	// Promo slider
	if($('.place-slider').length > 0){
		$('.place-slider').bxSlider({
			pagerCustom: '.place-pager',
			mode: "fade"
		});
	}

	// Search filter
	if($("#price-slider").length > 0){
		$("#price-slider").slider({
			range: "max",
			min: 1,
			max: 5,
			value: 1,
			slide: function(event, ui) {
				$("#amount").val(ui.value);
			}
		});
		$("#amount").val($("#price-slider").slider("value"))
	}

	// Object-fit:cover; for IE
	var userAgent, ieReg, ie;
	userAgent = window.navigator.userAgent;
	ieReg = /msie|Trident.*rv[ :]*11\./gi;
	ie = ieReg.test(userAgent);
	if(ie) {
		$(".img-container").each(function () {
			var $container = $(this),
			    imgUrl = $container.find("img").prop("src");
			if (imgUrl) {
			  $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("custom-object-fit");
			}
		});
	}

	// Like
	$(".form-rate__btn").click(function(e) {
		e.preventDefault();
		$(".form-rate__btn").removeClass("active");
		$(this).toggleClass("active");
	})

	// Video
	$(".modal-content__play").click(function(){
		var dataYoutube = $(this).parents('.modal-content__poster').attr('data-youtube');
		$(this).parents('.modal-content__poster').html('<iframe src="https://www.youtube.com/embed/'+ dataYoutube +'?autoplay=1" frameborder="0" allowfullscreen></iframe>')
	});

	// Modal 
	$(".promo-video-item, .event-video-item, .event-gallery-item").click(function(e){
		e.preventDefault();
		$('#modal').arcticmodal();
	});

	// Phone mask
	$(".phone-mask").mask("+7 (999) 999 99 99");

	// Placeholder for IE
	$('input, textarea').placeholder();
}); 