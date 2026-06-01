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
            delay: 5000, 
        }
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
    const outsideItems = document.querySelectorAll('.equipment__section');

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
            slideChange(swiper) {
                outsideItems.forEach(item => {
                    item.classList.remove('active');
                });
                outsideItems[swiper.realIndex].classList.add('active');
            }
        }
    })

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

    // Custom scrollbar
    document.querySelectorAll('.custom_scroll').forEach(el => {
        new SimpleBar(el);
    })

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

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.equipment',
            start: 'top top',
            end: '+=7000',
            scrub: true,
            pin: true,
        }
    });
    tl.to('.equipment__bg', {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
    });
    tl.fromTo('.equipment__title',
        {
            y: -200,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.equipment__desc',
        {
            x: 300,
            opacity: 0,
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.equipment-carousel',
        {
            y: 200,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.equipment-carousel__nav',
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
        }
    );
    tl.to({}, {
        duration: 2
    });
    tl.to('.equipment-scene-1', {
        autoAlpha: 0,
        y: -150,
        duration: 1.5,
    });
    tl.to('.equipment-scene-2', {
        autoAlpha: 1,
        duration: 1,
    });
    tl.fromTo('.individual__title',
        {
            y: -200,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.individual__text_1',
        {
            x: -300,
            opacity: 0,
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.individual__text_2',
        {
            y: 200,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
        }
    );
    tl.fromTo('.individual__btn',
        {
            opacity: 0,
            y: 50,
            visibility: 'hidden'
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            visibility: 'visible'
        }
    );
});