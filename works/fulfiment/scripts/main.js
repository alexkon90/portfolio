$(document).ready(function(){
    // Animation
    wow = new WOW({
        boxClass:     'wow',     
        animateClass: 'animated',
        offset:       30,
        mobile:       false,
        live:         true
    })
    wow.init();

    // Header menu
	$(".header-mobile__btn").click(function(){
		$(".header").addClass("open");
		$(".bg").addClass("active");
	});
    $(".header-mobile__close, .bg").click(function(){
		$(".header").removeClass("open");
		$(".bg").removeClass("active");
	});

    // FAQ
    $(function () {
        let el = $('.faq-accordeon__caption');
        el.click(function() {
            let checkedElement = $(this).next(),
                visibleElement = $('.faq-accordeon__content:visible');
                
            visibleElement.stop().animate({'height':'toggle'}, 300).parent().removeClass('active');     
            if((checkedElement.is('.faq-accordeon__content')) && (!checkedElement.is(':visible'))) {
                checkedElement.stop().animate({'height':'toggle'}, 300).parent().addClass('active');
                return false;
            }   
            if((checkedElement.is('.faq-accordeon__content')) && (checkedElement.is(':visible'))) {
                return false;
            }
        });
    });

    // Smooth scroll
    $("a.scrollto").click(function () {
        let elementClick = $(this).attr("href")
        let destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 600);
        return false;
    });
    
	// Phone mask
	$(".js-input_phone").inputmask("+7 (999) 999 99 99");

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

	// Modal callback
	$(".js-btn-callback").on("click", function(event){
	  event.preventDefault();
	  $.fancybox.open({
	    src  : "#modal-callback",
	    closeExisting: true,
	    baseClass: "dark__bg",
	    touch: false,
	    transitionEffect: "circular",
	  });
	});
}); 