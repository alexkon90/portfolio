$(document).ready(function(){
	// Menu
	$(".header-menu__switcher").click(function(){
		$("body").addClass("lock");
		$(".header-menu").addClass("open");
	});
	$(".header-menu__close").click(function(){
		$("body").removeClass("lock");
		$(".header-menu").removeClass("open");
	});

    // Slider
    if($('.mainreviews-slider').length > 0){
    	$('.mainreviews-slider').slick({
    		//autoplay: true,
    		//infinite: false,
    		arrows: false,
    		dots: true,
    		slidesToShow: 1,
    		accessibility: false,
    		autoplaySpeed: 3000,
    	});
    }

	// Faq
	$(".faq-item__q").on("click", function () {
        $(this).parent().toggleClass("active"), $(this).parent().hasClass("active") ? $(this).next().slideDown(200) : ($(".faq-item__a").slideUp(200), $(".faq-item").removeClass("active"));
    }),
    $(function (e) {
        e(document).mouseup(function (a) {
            var t = e(".faq-item.active");
            t.is(a.target) || 0 !== t.has(a.target).length || t.removeClass("active");
        });
    }),
    $(function (e) {
        e(document).mouseup(function (a) {
            var t = e(".faq-item__a");
            t.is(a.target) || 0 !== t.has(a.target).length || t.slideUp(200);
        });
    });

	// Custom Select
	$('.select').click(function(event) {
		if(!$(this).hasClass('disabled')){
			$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
			$(this).toggleClass('active');
			$(this).find('.select-options').slideToggle(50);
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
			$('.select-options').slideUp(50);
		};
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

	// Phone mask
	$(".input_mask").inputmask("+7 (999) 999 99 99");
}); 