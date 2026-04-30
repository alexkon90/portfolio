document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const nav = document.querySelector('.header__body');
    const body = document.body;

    document.addEventListener('click', (event) => {
        if (event.target.closest('.js-menu-switcher')) {
            nav?.classList.add('open');
            body.classList.add('lock');
        }

        if (event.target.closest('.js-menu-close')) {
            nav?.classList.remove('open');
            body.classList.remove('lock');
        }
    });

    // Accordeon

    document.querySelectorAll('.maincategories').forEach((accordion) => {

        const firstItem = accordion.querySelector('.maincategories-item');

        if (!firstItem) return;

        firstItem.classList.add('active');

        const content = firstItem.querySelector('.maincategories-item__content');
        const inner = firstItem.querySelector('.maincategories-item__content-inner');

        if (content && inner) {
            content.style.height = inner.offsetHeight + 'px';
        }

    });


    document.addEventListener('click', (event) => {

        const caption = event.target.closest('.maincategories-item__caption');

        if (!caption) return;

        const item = caption.closest('.maincategories-item');
        const accordion = caption.closest('.maincategories');

        if (!item || !accordion) return;

        if (item.classList.contains('active')) return;

        const activeItem = accordion.querySelector('.maincategories-item.active');

        if (activeItem) {
            const activeContent = activeItem.querySelector('.maincategories-item__content');

            if (activeContent) {
                activeContent.style.height = '0px';
            }

            activeItem.classList.remove('active');
        }

        const content = item.querySelector('.maincategories-item__content');
        const inner = item.querySelector('.maincategories-item__content-inner');

        item.classList.add('active');

        if (content && inner) {
            content.style.height = inner.offsetHeight + 'px';
        }

    });







    // Sliders
    function initSlider(selector, options) {
        const element = document.querySelector(selector);

        if (!element) return null;

        return new Swiper(element, options);
    }

    // Mainarticles carousel
    initSlider('.mainarticles-carousel', {
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainarticles-carousel__next',
            prevEl: '.mainarticles-carousel__prev',
        },
        breakpoints: {
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2.3 },
            1280: { slidesPerView: 3.3 },
            1800: { slidesPerView: 4.3 }
        }
    });

    // Mainabout carousel
    initSlider('.mainabout-gallery__slider', {
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainabout-gallery__next',
            prevEl: '.mainabout-gallery__prev',
        },
        breakpoints: {
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
            1450: { slidesPerView: 2.1 }
        }
    });

    // Mainstages carousel
    initSlider('.mainstages-carousel', {
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainstages-carousel__next',
            prevEl: '.mainstages-carousel__prev',
        },
        breakpoints: {
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
            1440: { slidesPerView: 4 }
        }
    });

    // Maincases carousel
    initSlider('.maincases-carousel', {
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.maincases-carousel__next',
            prevEl: '.maincases-carousel__prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1450: { slidesPerView: 3 }
        }
    });

    // Products carousel
    initSlider('.other-products-carousel', {
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.other-products-carousel__next',
            prevEl: '.other-products-carousel__prev',
        },
        breakpoints: {
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2.3 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
            1800: { slidesPerView: 4 }
        }
    });

    // Service variants
    let mobileSlider = null;

    function initMobileSlider() {
        const slider = document.querySelector('.service-variants__body');

        if (!slider) return;

        if (window.innerWidth <= 767) {
            if (!mobileSlider) {
                mobileSlider = new Swiper(slider, {
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.service-variants__next',
                        prevEl: '.service-variants__prev',
                    },
                });
            }
        } else {
            if (mobileSlider) {
                mobileSlider.destroy(true, true);
                mobileSlider = null;
            }
        }
    }
    initMobileSlider();

    // Equipment carousel
    let mobileSlider_2 = null;

    function initMobileSlider_2() {
        const slider = document.querySelector('.equipment-carousel');

        if (!slider) return;

        if (window.innerWidth <= 767) {
            if (!mobileSlider_2) {
                mobileSlider_2 = new Swiper(slider, {
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                    navigation: {
                        nextEl: '.equipment-carousel__next',
                        prevEl: '.equipment-carousel__prev',
                    },
                });
            }
        } else {
            if (mobileSlider_2) {
                mobileSlider_2.destroy(true, true);
                mobileSlider_2 = null;
            }
        }
    }
    initMobileSlider_2();

    window.addEventListener('resize', initMobileSlider);
    window.addEventListener('resize', initMobileSlider_2);
});