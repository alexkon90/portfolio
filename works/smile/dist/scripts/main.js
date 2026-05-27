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
        //autoplay: { 
        //    delay: 3000, 
        //}
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
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
            prevEl: '.doctors-carousel__prev',
            nextEl: '.doctors-carousel__next',
        },
        breakpoints: {
            768: { spaceBetween: 30 },
            1280: { spaceBetween: 60 },
        }
    });

    initSlider('.equipment-carousel', {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 8,
        speed: 500,
        initialSlide: 0,
        //centeredSlides: true,
        //centeredSlidesBounds: true,
        //slideToClickedSlide: true,
        navigation: {
            prevEl: '.equipment-carousel__prev',
            nextEl: '.equipment-carousel__next',
        },
        breakpoints: {
            480: { spaceBetween: 20, }
        },
        on: {
        init(swiper) {
            swiper.el.classList.add('is-initial');
        },

        touchStart(swiper) {
            swiper.el.classList.remove('is-initial');
        },

        slideChangeTransitionStart(swiper) {
            swiper.el.classList.remove('is-initial');
        },

        click(swiper) {
            swiper.el.classList.remove('is-initial');
        }
    }
    });

    

    // Header
    const header = document.querySelector('.header');
    if (!header) return;

    const toggleHeaderClass = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    toggleHeaderClass();
    window.addEventListener('scroll', toggleHeaderClass);
    

    // Menu
    const modal = document.querySelector('.modalmain');
    const switcher = document.querySelector('.header-menu__switcher');
    const closeBtn = document.querySelector('.modalmain__close');

    if (!modal || !switcher) return;

    const hasHover = window.matchMedia('(hover: hover)').matches;

    if (hasHover) {
        switcher.addEventListener('mouseenter', () => {
            modal.classList.add('open');
        });

        modal.addEventListener('mouseleave', () => {
            modal.classList.remove('open');
        });
    }

    else {
        switcher.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (
                modal.classList.contains('open') &&
                !modal.contains(e.target) &&
                !switcher.contains(e.target)
            ) {
                modal.classList.remove('open');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    // Datepicker
    let dt = new Date;
    flatpickr.localize(flatpickr.l10ns.ru);
    let calendar = flatpickr("#datepicker", {
        dateFormat: "d.m.Y",
        minDate: "today",
        //maxDate: dt.setDate(dt.getDate() + 3),
        // dateFormat: "d.m.Y H:i",
        //noCalendar: true,
        // enableTime: true,
        //time_24hr: true
        // minDate: new Date(),
        // maxDate: new Date().fp_incr(7),
        // mode: "range",
        locale: {
            rangeSeparator: " - "
        },
    });

    // Custom scrollbar
    document.querySelectorAll('.custom_scroll').forEach(el => {
        new SimpleBar(el);
    })
});