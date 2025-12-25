$(document).ready(function(){
    // Change header on scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 30) {
            $('.header').addClass('header--scroll');
        }
        else {
            $('.header').removeClass('header--scroll');
        }
    });

    // Mobile menu
	$(".header-mobile-menubtn").click(function(){
        $("body").addClass("lock");
        $(".header-inner").addClass("open");
	});
    $(".header-mobile__close").click(function(){
        $("body").removeClass("lock");
        $(".header-inner, .header-submenu").removeClass("open");
	});

    $(".header-menu__link, .header-submenu__link").click(function(){
        $(this).next(".header-submenu").addClass("open");
	});
    $(".header-submenu__prev").click(function(){
        $(this).closest(".header-submenu").removeClass("open");
	});

    // Mobile search
    $(".js-search-btn").click(function(e){
        e.preventDefault();
        $(this).toggleClass("active");
        $(".header-search").toggleClass("open");
	});
    $(document).click(function(e) {
        if (!$(e.target).is(".header-search *, .js-search-btn *")) {
            $(".js-search-btn").removeClass("active");
            $(".header-search").removeClass("open");
        };
    });

    // Dropdown
	$(".header-optionsbtn").click(function(){
        $(".dropdown").addClass("show");
        $(".overlay").addClass("active");
	});
    $(".dropdown__close").click(function(){
        $(".dropdown").removeClass("show");
        $(".overlay").removeClass("active");
	});
    $(document).click(function(e) {
        if (!$(e.target).is(".dropdown *, .header-optionsbtn")) {
            $(".dropdown").removeClass("show");
        };
    });
    
    // Dropdown categories
    $(".js-categories-btn").click(function(){
		$(".dropdown-categories").addClass("show");
        $(".overlay").addClass("active");
	});
    $(".dropdown-categories__close").click(function(){
		$(".dropdown-categories").removeClass("show");
        $(".overlay").removeClass("active");
	});
    $(document).click(function(e) {
        if (!$(e.target).is(".dropdown-categories *, .js-categories-btn")) {
            $(".dropdown-categories").removeClass("show");
        };
    });

    $(".dropdown-categories .menu-categories__item").hover(function(){
		$(".menu-categories__item").removeClass("active");
		$(this).addClass("active");
	});

    $(".overlay").click(function(){
        $(".overlay").removeClass("active");
        $(".overlay-categories").removeClass("active");
        $(this).removeClass("active");
	});

    // Select
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

    // Catalog view
	$('.catalog-view__btn').click(function(event) {
		$('.catalog-view__btn').removeClass('active');
		$(this).addClass('active');
		if($('.catalog-view__btn.active').hasClass('grid')){
			$('.products__row').removeClass('list').addClass('grid');
		}else{
			$('.products__row').removeClass('grid').addClass('list');
		}
	});

    // Catalog sort mobile
    $(".catalog-sort__caption").click(function(){
        $(".catalog-sort").addClass("open");
	});
    $(".catalog-sort__item").click(function(){
        $(".catalog-sort").removeClass("open");
	});

    // Catalog reviews show more
    $(".reviews-item__fulltext").click(function(){
        $(this).toggleClass("active");
        $(this).parents(".reviews-item").find(".reviews-item__text").toggleClass("show");
	});

    // Catalog tags show more
    $(".catalog-tags__show").click(function(){
        $(this).toggleClass("active");
        $(".catalog-tags__block.hidden").toggleClass("visible");
	});
    
    // Card expand
    $(".js-btn-expand").click(function(){
        $(".card-description__hidden").toggleClass("show");
        $(this).toggleClass("active");
	});

    // Card show filters
    $(".card-filters__show").click(function(e){
        e.preventDefault();
        $(this).hide();
        $(".card-filters__hidden").removeClass("card-filters__hidden");
	});

    // Sticky card nav
    if($('.card__nav').length > 0){
		$('.card__nav').stick_in_parent({});
	}

    // Timers
    $(".timer").each(function() {
        var timer = $(this).attr("data-countdown");
        var countDownDate = new Date(timer).getTime();
        var $this = $(this);
        var x = setInterval(function() {
      
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        $this.find('.timer__days').text(days)
        $this.find('.timer__hours').text(hours)
        $this.find('.timer__minutes').text(minutes)
        $this.find('.timer__seconds').text(seconds)

          if (distance < 0) {
            //clearInterval(x);
            //$this.text("EXPIRED");
          }
      
        }, 100);
    });

    // Filter tooltip
    const showApplyModal = (event) => {
        const coords = event.target.getBoundingClientRect();
        const filterWindow = document.querySelector('.filter-float');
        filterWindow.style.top = coords.y + "px";
        filterWindow.style.left = coords.x + "px";
        filterWindow.style.display = 'block';
        
        console.log(coords.y)
    }
    $('.filter-checkbox input').on('change', showApplyModal);
  

    // Footer nav mobile
    if ($(window).width() < 768){
        $(".footer-menu__caption").click(function(){
            $(this).parents(".footer-menu__section").siblings().find(".footer-menu__list").slideUp(200);
            $(this).parents(".footer-menu__section").siblings().find(".footer-menu__caption").removeClass("active");
            $(this).toggleClass("active");
            $(this).next(".footer-menu__list").slideToggle(200);
        });
    }

    // Filter
    $(".catalog-filterbtn").click(function(){
        $("body").addClass("lock");
        $(".filter__section").addClass("open");
	});
    $(".filter__close").click(function(){
        $("body").removeClass("lock");
        $(".filter__section").removeClass("open");
	});

    $(".filter-section__caption").click(function(){
        $(this).toggleClass("active");
        $(this).next(".filter-section__content").slideToggle(300);
	});

    // Filter price slider
    const priceSliderInit = () => { // создаем функцию инициализации слайдера
        const range = document.getElementById('js-price-slider'); // Ищем слайдер
        const inputMin = document.getElementById('js-price_min'); // Ищем input с меньшим значнием
        const inputMax = document.getElementById('js-price_max'); // Ищем input с большим значнием
        
        if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок
        
        const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
        
        noUiSlider.create(range, { // инициализируем слайдер
                start: [250000, 450000], // устанавливаем начальные значения
                connect: true, // указываем что нужно показывать выбранный диапазон
                range: { // устанавливаем минимальное и максимальное значения
                    'min': 200000,
                    'max': 500000
                },
                step: 1, // шаг изменения значений
            }
        )
        range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
            inputs[handle].value = parseInt(values[handle]);
        });
        inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
            range.noUiSlider.set([this.value, null]);
        });
        inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
            range.noUiSlider.set([null, this.value]);
        });
    }
    priceSliderInit() // запускаем функцию инициализации слайдера

    // Filter power slider
    const powerSliderInit = () => {
        const range = document.getElementById('js-power-slider');
        const inputMin = document.getElementById('js-power_min'); 
        const inputMax = document.getElementById('js-power_max'); 
        
        if (!range || !inputMin || !inputMax) return 
        
        const inputs = [inputMin, inputMax]; 
        
        noUiSlider.create(range, { 
                start: [4.5, 15],
                connect: true,
                step: 0.1,
                range:{
                    'min': 1,
                    'max': 30
                },
            }
        )
        range.noUiSlider.on('update', function (values, handle) { 
            inputs[handle].value = parseInt(values[handle]);
        });
        inputMin.addEventListener('change', function () {
            range.noUiSlider.set([this.value, null]);
        });
        inputMax.addEventListener('change', function () { 
            range.noUiSlider.set([null, this.value]);
        });
    }
    powerSliderInit() 

    // Scroll up
    $('#up').click(function(event) {
        $('body,html').animate({scrollTop:0},500);
    });

    // Slick slider custom arrows
    $('.slider-info__arrow.slick-prev').click(function(event) {
        $(this).parents('.slider-wrap').find('.slick-slider').slick('slickPrev');
    });
    $('.slider-info__arrow.slick-next').click(function(event) {
        $(this).parents('.slider-wrap').find('.slick-slider').slick('slickNext');
    });

    // Smooth scroll
    $("a.scrollto").click(function () {
        let elementClick = $(this).attr("href")
        let destination = $(elementClick).offset().top - 160;
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

    // Card slider
    $('.card-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.card-thumbs',
        responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
            }
        }]
    });
    $('.card-thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.card-slider',
        arrows: true,
        focusOnSelect: true,
        responsive: [
        {
            breakpoint: 1300,
            settings: {
                vertical: true,
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 111,
            settings: {
                slidesToShow: 4,
            }
        }]
    });

    // Promo slider
    let $promoSlider = $('#js-promo-slider');

    $promoSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $(".promo-slider__count").text(i + ' / ' + slick.slideCount);
    });
    $promoSlider.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        accessibility: false,
        autoplaySpeed: 3000,
    });

    // Products carousel
    let $productsCarousel = $('#js-products-carousel');

    $productsCarousel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $(".mainproducts-carousel__count").text(i + ' / ' + slick.slideCount);
    });
    $productsCarousel.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
            }
        }]
    });

    // Gallery carousel
    let $galleryCarousel = $('#js-gallery-carousel');

    $galleryCarousel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $(".maingallery-carousel__count").text(i + ' / ' + slick.slideCount);
    });
    $galleryCarousel.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        accessibility: false,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 1300,
            settings: {
                variableWidth: true,
                slidesToScroll: 1,
            }
        }]
    });

    // Videos carousel
    let $videosCarousel = $('#js-videos-carousel');

    $videosCarousel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $videosCarousel.parents('.slider-wrap').find(".slider-info__count").text(i + ' / ' + slick.slideCount);
    });
    $videosCarousel.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        accessibility: false,
        autoplaySpeed: 3000,
    });

    // Products carousel
    let $recommendCarousel = $('#js-recommend-carousel');

    $recommendCarousel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $recommendCarousel.parents('.slider-wrap').find(".slider-info__count").text(i + ' / ' + slick.slideCount);
    });
    $recommendCarousel.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
            }
        }]
    });

    // Mainarticles carousel
    let $mainarticles = $('#js-mainarticles-carousel');

    $mainarticles.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $mainarticles.parents('.slider-wrap').find(".slider-info__count").text(i + ' / ' + slick.slideCount);
    });
    $mainarticles.slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: false,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                variableWidth: true,
            }
        }]
    });

    // Catalog-recommend-carousel
    let $catalogRecommendCarousel = $('#js-catalog-recommend-carousel');

    $catalogRecommendCarousel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $catalogRecommendCarousel.parents('.slider-wrap').find(".slider-info__count").text(i + ' / ' + slick.slideCount);
    });
    $catalogRecommendCarousel.slick({
        //autoplay: true,
        //infinite: false,
        arrows: true,
        dots: false,
        slidesToShow: 1,
        accessibility: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        //centerMode: true,
        //variableWidth: true,
    });

    // Videos carousel2
    let $videosCarousel2 = $('#js-videos-carousel2');

    $videosCarousel2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $videosCarousel2.parents('.slider-wrap').find(".slider-info__count").text(i + ' / ' + slick.slideCount);
    });
    $videosCarousel2.slick({
        //autoplay: true,
        //infinite: false,
        arrows: true,
        dots: false,
        slidesToShow: 4,
        accessibility: false,
        autoplaySpeed: 3000,
        //adaptiveHeight: true,
        //centerMode: true,
        responsive: [
        {
            breakpoint: 1579,
            settings: {
                variableWidth: true,
                slidesToShow: 1,
                infinite: true,
            }
        }]
    });
    
    // Card products carousel
    $('#js-card-products-carousel').slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        //centerMode: true,
        //variableWidth: true,
        responsive: [
        {
            breakpoint: 1900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 1300,
            settings: {
                variableWidth: true,
                slidesToScroll: 1,
            }
        }]
    });

    // Specialists carousel
	if($('.js-specialists-carousel').length > 0){
		$('.js-specialists-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
            adaptiveHeight: true,
			//centerMode: true,
			//variableWidth: true,
		});
	}

    // Mainadress carousel
    if($('.js-mainadress-carousel').length > 0){
		$('.js-mainadress-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
    	    slidesToScroll: 1,
			autoplaySpeed: 3000,
            variableWidth: true,
            mobileFirst: true,
            responsive: [
                    {
                        breakpoint: 990,
                        settings: 'unslick'
                    },
                {
            }]
		});
	}

    // Brands carousel
    $('.js-brands-carousel').slick({
        //autoplay: true,
        //infinite: false,
        arrows: false,
        dots: false,
        slidesToShow: 10,
        accessibility: false,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 1580,
            settings: {
                slidesToShow: 8,
            }
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6,
                variableWidth: true,
            }
        }]        
    });

    // Popular categories carousel
    if($('.js-popular-categories-carousel').length > 0){
		$('.js-popular-categories-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
    	    slidesToScroll: 1,
			autoplaySpeed: 3000,
            variableWidth: true,
            mobileFirst: true,
            responsive: [
                    {
                        breakpoint: 990,
                        settings: 'unslick'
                    },
                {
            }]
		});
	}

    // Mainabout features
    if($('.js-mainabout-features').length > 0){
        $('.js-mainabout-features').slick({
            //autoplay: true,
            //infinite: false,
            arrows: true,
            dots: false,
            slidesToShow: 1,
            accessibility: false,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            variableWidth: true,
            mobileFirst: true,
            responsive: [
                    {
                        breakpoint: 768,
                        settings: 'unslick'
                    },
                {
            }]
        });
    }

    // Services carousel
    if($('.js-services-carousel').length > 0){
        $('.js-services-carousel').slick({
            //autoplay: true,
            //infinite: false,
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: false,
            autoplaySpeed: 3000,
            mobileFirst: true,
            variableWidth: true,
            responsive: [
            {
                breakpoint: 1300,
                settings: 'unslick'
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    variableWidth: false,
                }
            }]
        });
    }

    // Articles carousel
    if($('.js-articles-carousel').length > 0){
        $('.js-articles-carousel').slick({
            //autoplay: true,
            //infinite: false,
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: false,
            autoplaySpeed: 3000,
            mobileFirst: true,
            variableWidth: true,
            responsive: [
            {
                breakpoint: 1300,
                settings: 'unslick'
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    variableWidth: false,
                }
            }]
        });
    }

    // Catalog carousel
	if($('.js-catalog-carousel').length > 0){
		$('.js-catalog-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 8,
			accessibility: false,
			autoplaySpeed: 3000,
            adaptiveHeight: true,
			responsive: [
			{
				breakpoint: 1580,
				settings: {
					slidesToShow:6,
				}
			},
			{
				breakpoint: 1300,
				settings: {
        			arrows: false,
        			variableWidth: true,
				}
			}]
		});
	}

    // Card features carousel
	if($('.js-card-features-carousel').length > 0){
		$('.js-card-features-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 3,
			accessibility: false,
			autoplaySpeed: 3000,
            adaptiveHeight: true,
			responsive: [
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	}

    // Reviews carousel
	if($('.js-reviews-carousel').length > 0){
		$('.js-reviews-carousel').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
            adaptiveHeight: true,
			variableWidth: true,
			responsive: [
			{
				breakpoint: 1170,
				settings: {
					slidesToShow:2,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow:1,
				}
			}]
		});
	}
}); 