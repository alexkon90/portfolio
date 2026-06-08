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
        loop: true,
        effect: "fade",
        pagination: {
            el: ".promo-slider__pagination",
            clickable: true,
        },
        autoplay: { 
            delay: 3000, 
        }
    });

    // Doctors carousel
    initSlider('.doctors-carousel', {
        slidesPerView: "auto",
        spaceBetween: 16,
        navigation: {
            prevEl: '.doctors-carousel__prev',
            nextEl: '.doctors-carousel__next',
        },
        breakpoints: {
            768: { spaceBetween: 24 },
            1280: { spaceBetween: 50 },
        }
    });

    // interior-slider
    const imageSwiper = new Swiper('.interior-slider', {
        loop: false,
        parallax: true,
        slidesPerView: 1,
        speed: 900,
        navigation: {
            prevEl: '.interior-slider-nav__prev',
            nextEl: '.interior-slider-nav__next',
        },
    });
    const textSwiper = new Swiper(".interior-slider-desc",{
        loop: false,
        parallax: true,
        slidesPerView: 1,
        effect: "fade",
        speed: 400,
    });

    imageSwiper.controller.control = textSwiper;
    textSwiper.controller.control = imageSwiper;

    // Doctors filters
    const filter = document.querySelector('.maindoctors-filter');

    if (filter) {
        const current = filter.querySelector('.maindoctors-filter__current');
        const items = filter.querySelectorAll('.maindoctors-filter__item');

        const activeItem = filter.querySelector('.maindoctors-filter__item.active');

        if (activeItem) {
            current.textContent = activeItem.textContent;
        }

        current.addEventListener('click', () => {
            filter.classList.toggle('opened');
        });

        items.forEach(item => {
            item.addEventListener('click', (e) => {

                e.preventDefault();

                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                current.textContent = item.textContent;

                filter.classList.remove('opened');
            });

        });

        document.addEventListener('click', (e) => {
            if (!filter.contains(e.target)) {
                filter.classList.remove('opened');
            }
        });
    }

    // Phone mask
    const phoneInputs = document.querySelectorAll('.js_phone_mask');

    phoneInputs.forEach(input => {
        const mask = IMask(input, {
            mask: '+{7} (000) 000-00-00',
            lazy: true,
            placeholderChar: '_'
        });
        input.addEventListener('focus', () => {
            mask.updateOptions({
                lazy: false
            });

            if (!input.value) {
                mask.value = '+7 (';
            }
        });
        input.addEventListener('blur', () => {
            if (mask.unmaskedValue === '7') {
                mask.value = '';
            }

            mask.updateOptions({
                lazy: true
            });
        });
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
        let openTimeout;
        let closeTimeout;

        const openMenu = () => {
            clearTimeout(closeTimeout);

            openTimeout = setTimeout(() => {
                modal.classList.add('open');
            }, 150);
        };

        const closeMenu = () => {
            clearTimeout(openTimeout);

            closeTimeout = setTimeout(() => {
                modal.classList.remove('open');
            }, 150);
        };

        switcher.addEventListener('mouseenter', openMenu);
        modal.addEventListener('mouseenter', openMenu);

        switcher.addEventListener('mouseleave', closeMenu);
        modal.addEventListener('mouseleave', closeMenu);
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

    // Custom select
    const select = document.querySelector('#select');
    if (select) {
        new TomSelect(select, {
            controlInput: null,
            searchField: false,
        });
    }

    // Custom scrollbar
    document.querySelectorAll('.custom_scroll').forEach(el => {
        new SimpleBar(el);
    })

    // Up
    const upButton = document.querySelector('.contacts-up');
    if (upButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                upButton.classList.add('active');
            } else {
                upButton.classList.remove('active');
            }
        });

        upButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Cookies
    document.querySelectorAll('[data-close]').forEach(button => {
        button.addEventListener('click', () => {
            const target = document.querySelector(button.dataset.close);
            if (target) {
                target.classList.remove('open');
            }
        });
    });

    document.addEventListener('click', e => {
        const openBtn = e.target.closest('.cookies-main__settings');
        const closeBtn = e.target.closest('.cookies-settings__back');

        if (openBtn) {
            openBtn.closest('.cookies').classList.add('active');
        }
        if (closeBtn) {
            closeBtn.closest('.cookies').classList.remove('active');
        }
    });

    document.querySelectorAll('.access-switcher__btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.access-switcher').classList.toggle('active');
        });
    });

    // Accordeon
    function initAccordion(selector, allowMultiple = false){
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            const button = item.querySelector('.csa-item__title');
            const content = item.querySelector('.csa-item__content');

            if(item.classList.contains('open')){
                content.style.height = content.scrollHeight + 'px';
            }
            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                if(!allowMultiple){
                    items.forEach(el => {
                        if(el !== item && el.classList.contains('open')){
                            const c = el.querySelector('.csa-item__content');
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
    initAccordion('.csa-item', true); // Если надо несколько открытых - ставим true

    // Modals
    MicroModal.init({
        openTrigger: 'data-micromodal-trigger', 
        closeTrigger: 'data-micromodal-close', 
        openClass: 'is-open',
        //disableScroll: true, 
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,

        onClose: modal => {
            const video = modal.querySelector('video');
            if (!video) return;
            video.pause();
            video.currentTime = 0;
        }
    });

    // Contacts tabs
    const tabButtons = document.querySelectorAll('[data-tab-btn]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tabBtn;

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            document.querySelectorAll('[data-tab-content]').forEach(content => {
                content.classList.remove('active');

                if (content.dataset.tabContent === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Animation
    gsap.registerPlugin(ScrollTrigger);

    const equipmentSwiper = initSlider('.equipment-carousel', {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 8,
        speed: 500,
        initialSlide: 0,
        autoplay: { 
            delay: 2000, 
            disableOnInteraction: true,
        },
        navigation: {
            prevEl: '.equipment-carousel__prev',
            nextEl: '.equipment-carousel__next',
        },
        breakpoints: {
            480: { 
                spaceBetween: 20,
            }
        }
    });

    gsap.set('.equipment-main__bg', {
        yPercent: 100
    });
    gsap.set('.equipment-block-1', {
        yPercent: 100,
        autoAlpha: 0
    });
    gsap.set('.equipment-block-2', {
        y: 40,
        autoAlpha: 0
    });
    gsap.set('.equipment__title_1 span', {
        opacity: 0,
        y: 80
    });
    gsap.set('.equipment__title_2 span', {
        opacity: 0,
        y: 80
    });

    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.equipment-main',
            start: 'top top',
            end: '+=2000',
            scrub: 1,
            pin: true,
            anticipatePin: 1
            // markers: true
        }
    });

    masterTl.to('.equipment-main__bg', {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, 0);

    masterTl.to('.equipment-block-1', {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out'
    }, 0);

    masterTl.to('.equipment__title_1 span', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    masterTl.to('.equipment-block-1', {
        autoAlpha: 0,
        y: -40,
        duration: 0.8,
        ease: 'power1.inOut'
    });

    masterTl.to({}, { duration: 0.3 });

    masterTl.to('.equipment-block-2', {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power2.out',
    });

    masterTl.to('.equipment__title_2 span', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, "-=0.6");

    masterTl.to({}, { duration: 0.8 });

});