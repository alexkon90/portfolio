$(document).ready(function(){
    // Menu
	$(".header-menu__switcher").click(function(){
		$(".header-menu").addClass("open");
	});
    $(".header-menu__close").click(function(){
		$(".header-menu").removeClass("open");
	});

    // Phone mask
	$(".phone_mask").inputmask("+7 (999) 999 99 99");

    // Accordeon
    $(function () {
        $(document).on('click', '.accordeon-list__caption', function (e) {
            e.preventDefault();

            const $caption = $(this);
            const $item = $caption.parent();
            const $content = $caption.next('.accordeon-list__content');

            if (!$content.length) return;

            const $root = $caption.closest('.accordeon-list'); 
            const $opened = $root.find('.accordeon-list__content:visible').not($content);

            $opened.stop(true, true).slideUp(300).parent().removeClass('active');

            $content.stop(true, true).slideToggle(300);
            $item.toggleClass('active');
        });
    });

    // Tariffs carousel
	if($('.tariffs-carousel').length > 0){
		$('.tariffs-carousel').slick({
			//autoplay: true,
			infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 3,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 222,
				settings: {
					slidesToShow:2,
				}
			},
			{
				breakpoint: 111,
				settings: {
					slidesToShow:1,
				}
			}]
		});
	}

    // Reviews carousel
	if($('.reviews-carousel').length > 0){
		$('.reviews-carousel').slick({
			//autoplay: true,
			infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 4,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 222,
				settings: {
					slidesToShow:2,
				}
			},
			{
				breakpoint: 111,
				settings: {
					slidesToShow:1,
				}
			}]
		});
	}

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