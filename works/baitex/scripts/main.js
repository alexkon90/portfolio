$(document).ready(function(){
    // Menu
	$(".header-menu__toggle").click(function(){
		$("body").addClass("lock");
		$(".header-menu").addClass("open");
	});
    $(".header-menu__close, .bg-menu").click(function(){
		$("body").removeClass("lock");
		$(".header-menu").removeClass("open");
	});
    $(function () {
        const bp = 1299;
        const isMobile = () => window.innerWidth <= bp;

        $('.header-menu__list').on('click', '.has-submenu > span', function () {
            if (!isMobile()) return;

            const $li = $(this).closest('.has-submenu');
            const $drop = $li.children('.header-menu__dropdown');

            // close other submenus
            $li.siblings('.has-submenu')
            .removeClass('is-open')
            .children('.header-menu__dropdown')
            .stop(true, true)
            .slideUp(200);

            $li.toggleClass('is-open');
            $drop.stop(true, true).slideToggle(200);
        });

        $(window).on('resize', function () {
            if (!isMobile()) {
            $('.has-submenu')
                .removeClass('is-open')
                .children('.header-menu__dropdown')
                .removeAttr('style');
            }
        });
    });

    // Gift
    $(function() {
        function toggleGiftState() {
            if ($('.gift.active').length) {
                $('body').addClass('gift_open');
            } else {
                $('body').removeClass('gift_open');
            }
        }
        toggleGiftState();

        $(document).on('click', '.gift__close', function() {
            $('.gift').removeClass('active');
            $('body').removeClass('gift_open');
        });
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

            $content.stop(true, true).slideToggle(300);
            $item.toggleClass('active');
        });
    });

    // Tabs
    $(document).on('click', '.capabilities-tabs__btn', function() {
        const $btn = $(this);
        const $tabs = $btn.closest('.capabilities-tabs');
        const index = $btn.index();

        $btn.addClass('active')
            .siblings().removeClass('active');

        $tabs.find('.capabilities-tabs__section')
            .removeClass('active')
            .eq(index).addClass('active');
    });

    // Tariffs carousel
	if($('.tariffs-carousel').length > 0){
        function initSlick() {
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
                    breakpoint: 1299,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: "unslick"
                }]
            });
        }

        $(window).on('load resize', function() {
            if ($(window).width() > 767 && !$('.tariffs-carousel').hasClass('slick-initialized')) {
                initSlick();
            }
        });
	}

    // Form validation
    $(document).on('click', '.btn', function() {
        const $form = $(this).closest('.form');
        $form.find('input:not([type="hidden"]):not([disabled]), textarea').removeClass('error').each(function() {
            if ($.trim($(this).val()) === '') {
                $(this).addClass('error');
            }
        });
    });
    $(document).on('input', '.form input, .form textarea', function() {
        if ($.trim($(this).val()) !== '') {
            $(this).removeClass('error');
        }
    });

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
				breakpoint: 1299,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
                    variableWidth: true,
                    arrows: false
				}
			}]
		});
	}

    // Projects carousel
	if($('.projects-carousel').length > 0){
		$('.projects-carousel').slick({
			//autoplay: true,
			infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 3,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1299,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
                    variableWidth: true,
                    arrows: false
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