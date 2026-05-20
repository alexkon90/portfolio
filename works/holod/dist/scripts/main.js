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

    // Header search suggest
    const search = document.querySelector('.header-search__body');
    const input = search.querySelector('.header-search__input');
    const clearBtn = search.querySelector('.header-search__clear');
    const suggest = document.querySelector('.search-suggest');

    input.addEventListener('input', () => {
        const hasValue = input.value.trim().length > 0;

        clearBtn.classList.toggle('active', hasValue);
        suggest.classList.toggle('active', hasValue);
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();

        clearBtn.classList.remove('active');
        suggest.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        const isInsideSearch = e.target.closest('.header-search__body');
        const isInsideSuggest = e.target.closest('.search-suggest');

        if (!isInsideSearch && !isInsideSuggest) {
            input.value = '';
            clearBtn.classList.remove('active');
            suggest.classList.remove('active');
        }
    });

    // Maincategories Accordeon
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
            1400: { slidesPerView: 2.1 }
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

    // Mobile only Swipers
    const mobileSwipers = [];

    function initMobileSwiper(selector, options, index) {
        const slider = document.querySelector(selector);

        if (!slider) return;

        if (window.innerWidth <= 767) {
            if (!mobileSwipers[index]) {
                mobileSwipers[index] = new Swiper(slider, options);
            }
        } else {
            if (mobileSwipers[index]) {
                mobileSwipers[index].destroy(true, true);
                mobileSwipers[index] = null;
            }
        }
    }

    function updateMobileSwipers() {
        initMobileSwiper('.service-variants__body', {
            slidesPerView: 1,
            navigation: {
                nextEl: '.service-variants__next',
                prevEl: '.service-variants__prev',
            },
        }, 0);

        initMobileSwiper('.equipment-carousel', {
            slidesPerView: 1.1,
            spaceBetween: 16,
            navigation: {
                nextEl: '.equipment-carousel__next',
                prevEl: '.equipment-carousel__prev',
            },
        }, 1);
    }

    updateMobileSwipers();

    window.addEventListener('resize', updateMobileSwipers);

    // Accordeon
    function initAccordion(selector, allowMultiple = false){
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            const button = item.querySelector('.accordeon_caption');
            const content = item.querySelector('.accordeon_content');

            if(item.classList.contains('open')){
                content.style.height = content.scrollHeight + 'px';
            }
            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                if(!allowMultiple){
                    items.forEach(el => {
                        if(el !== item && el.classList.contains('open')){
                            const c = el.querySelector('.accordeon_content');
                            c.style.height = c.scrollHeight + 'px';
                            requestAnimationFrame(()=>{
                                c.style.height = '0px';
                            });
                            el.classList.remove('open');
                        }
                    });
                }
                if(isOpen){
                    content.style.height = content.scrollHeight + 'px';
                    requestAnimationFrame(()=>{
                        content.style.height = '0px';
                    });
                    item.classList.remove('open');
                }else{
                    item.classList.add('open');
                    content.style.height = '0px';
                    requestAnimationFrame(()=>{
                        content.style.height = content.scrollHeight + 'px';
                    });
                }
            });
        });
    }
    initAccordion('.accordeon_item', false); // Если надо несколько открытых - ставим true
});