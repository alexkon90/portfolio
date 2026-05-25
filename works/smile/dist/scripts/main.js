document.addEventListener('DOMContentLoaded', () => {
    // Sliders
    function initSlider(selector, options) {
        const element = document.querySelector(selector);

        if (!element) return null;

        return new Swiper(element, options);
    }

    // Promo carousel
    initSlider('.promo-slider', {
        slidesPerView: 1,
        effect: "fade",
        pagination: {
            el: ".promo-slider__pagination",
        },
        autoplay: { 
            delay: 3000, 
        }
    });

    initSlider('.interior-slider', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            prevEl: '.interior-slider-nav__prev',
            nextEl: '.interior-slider-nav__next',
        },
    });

    initSlider('.doctors-carousel', {
        slidesPerView: 3.4,
        spaceBetween: 60,
        navigation: {
            prevEl: '.doctors-carousel__prev',
            nextEl: '.doctors-carousel__next',
        },
    });

    initSlider('.equipment-carousel', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            prevEl: '.equipment-carousel__prev',
            nextEl: '.equipment-carousel__next',
        },
    });
});