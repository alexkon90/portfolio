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
        //slidesPerView: "auto",
        slidesPerView: 3.9,
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










    // 5. Инициализация слайдера Swiper
    const equipmentSwiper = initSlider('.equipment-carousel', {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 8,
        speed: 800,
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






    // Animation
    gsap.registerPlugin(ScrollTrigger);

    // СОЗДАЕМ ОДИН ОБЩИЙ ТАЙМЛАЙН. Прыгать больше нечему.
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.equipment-main',
            start: 'top top',       // Фиксируем секцию сразу, как только она дошла до верха экрана
            end: '+=2000',          // Длина всего процесса прокрутки (сделай больше, если нужно медленнее)
            scrub: 1,               // Плавный зажим за колесиком
            pin: true,              // Жестко держим экран
            anticipatePin: 1        // Сглаживает инициализацию фиксации
        }
    });

    // ШАГ 1: Из под нижнего края экрана выезжает ФОН и первый ТЕКСТ (Эффект шторки)
    masterTl.to(['.equipment-main__bg', '.equipment-block-1'], {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'none'
    });

    // ШАГ 2: Убираем скругление углов у шторки, когда она полностью встала на весь экран
    masterTl.to('.equipment-main__bg', {
        duration: 0.3,
        ease: 'none'
    });

    masterTl.fromTo('.equipment__title_1 span', {
        opacity: 0,
        y: 80 
    },
    {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        overwrite: 'auto'
    });

    // ШАГ 3: Растворяем ПЕРВЫЙ текст (он уплывает чуть вверх). Фон при этом замер и стоит!
    masterTl.to('.equipment-block-1', {
        opacity: 0,
        y: '-50px',
        duration: 0.8,
        ease: 'power1.inOut'
    });

    // ШАГ 4: Короткая пауза на чистом фоне для красоты
    masterTl.to({}, { duration: 0.3 });

    // ШАГ 5: Плавно проявляем ВТОРOЙ текст (он изящно приподнимается со своих 40px в 0)
    masterTl.to('.equipment-block-2', {
        autoAlpha: 1,
        y: '0%',
        duration: 1.2,
        ease: 'power2.out',
        onStart: () => {
            equipmentSwiper.update();
            equipmentSwiper.loopFix();
        }
    });

    masterTl.fromTo('.equipment__title_2 span', {
        opacity: 0,
        y: 80 
    },
    {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        overwrite: 'auto'
    });

    // ШАГ 6: Финальная пауза, чтобы успеть почитать второй блок, перед тем как скролл отпустит сайт вниз
    masterTl.to({}, { duration: 0.8 });
































    //gsap.registerPlugin(ScrollTrigger);

    //const outsideItems = document.querySelectorAll('.equipment__section');

    //// 1. Анимация фона при скролле
    ////gsap.to('.equipment__bg', {
    ////    width: '100vw',
    ////    height: '100vh',
    ////    borderRadius: 0,
    ////    ease: 'power2.out',
    ////    scrollTrigger: {
    ////        trigger: '.equipment',
    ////        start: 'top 80%',
    ////        end: 'top top',
    ////        scrub: 1,
    ////    }
    ////});

    //gsap.fromTo('.equipment__bg', 
    //    {
    //        top: '100%',
    //        height: '0vh',
    //    },
    //    {
    //        top: '0%',
    //        height: '100vh',
    //        ease: 'none', // Для scrub-анимаций лучше использовать 'none', чтобы движение идеально следовало за пальцем/колесом

    //        scrollTrigger: {
    //            trigger: '.equipment',
    //            start: 'top 100%', // Анимация начнется, как только верх секции покажется внизу экрана
    //            end: 'top top',     // Закончится, когда верх секции дойдет до верха экрана
    //            scrub: true,        // Плавная привязка к скроллу
    //        }
    //    }
    //);

    //// 2. Закрепление (Pin) секции
    //const tl = gsap.timeline({
    //    scrollTrigger: {
    //        trigger: '.equipment',
    //        start: 'top top',
    //        end: '+=6000',
    //        scrub: 1,
    //        pin: true,
    //    }
    //});

    //// 3. ОБНОВЛЕННАЯ ФУНКЦИЯ АНИМАЦИИ (Заголовок + Описание)
    //function playTitle(el) {
    //    // Находим спаны и в заголовке, и в описании текущего слайда
    //    const titleSpans = el.querySelectorAll('.equipment__title span');
    //    const descSpans = el.querySelectorAll('.equipment__desc span');
        
    //    // Объединяем их в один массив, чтобы анимация шла последовательно: сначала заголовок, потом описание
    //    const allSpans = [...titleSpans, ...descSpans];
        
    //    // Убиваем прошлые анимации на этих элементах, чтобы избежать конфликтов при быстром переключении
    //    gsap.killTweensOf(allSpans);

    //    // Сбрасываем позиции и анимируем появление
    //    gsap.fromTo(allSpans, 
    //        {
    //            opacity: 0,
    //            y: -80 
    //        },
    //        {
    //            opacity: 1,
    //            y: 0,
    //            stagger: 0.08,
    //            duration: 0.8,
    //            ease: 'power3.out',
    //            overwrite: 'auto'
    //        }
    //    );
    //}

    //// 4. Отдельный ScrollTrigger для ПЕРВОГО появления контента при скролле
    //ScrollTrigger.create({
    //    trigger: '.equipment',
    //    start: 'top 20%', 
    //    onEnter: () => {
    //        const activeSection = document.querySelector('.equipment__section.active');
    //        if (activeSection) {
    //            playTitle(activeSection);
    //        }
    //    },
    //    once: true 
    //});

    //// Переменная для отслеживания готовности слайдера
    //let isSliderReady = false;



    //tl.fromTo('.equipment-carousel',
    //    {
    //        y: 200,
    //        opacity: 0,
    //    },
    //    {
    //        y: 0,
    //        opacity: 1,
    //        duration: 1,
    //    }
    //);
    //tl.fromTo('.equipment-carousel__nav',
    //    {
    //        opacity: 0,
    //        y: 50,
    //    },
    //    {
    //        opacity: 1,
    //        y: 0,
    //        duration: 0.5,
    //    }
    //);
    //tl.to({}, {
    //    duration: 1,
    //});
    //tl.to('.equipment-scene-1', {
    //    autoAlpha: 0,
    //    y: -150,
    //    duration: 0.5,

    //});
    //tl.to('.equipment-scene-2', {
    //    autoAlpha: 1,
    //    duration: 1,
    //});
    //tl.fromTo('.individual__title span', {
    //        opacity: 0,
    //        y: -80 
    //    },
    //    {
    //        opacity: 1,
    //        y: 0,
    //        stagger: 0.1,
    //        duration: 0.8,
    //        ease: 'power3.out',
    //        overwrite: 'auto'
    //});
    //tl.fromTo('.individual__text_1 span',
    //    {
    //        opacity: 0,
    //        y: -80 
    //    },
    //    {
    //        opacity: 1,
    //        y: 0,
    //        stagger: 0.08, 
    //        duration: 0.8,
    //        ease: 'power3.out',
    //        overwrite: 'auto'
    //    }
    //);
    //tl.fromTo('.individual__text_2 span',
    //    {
    //        opacity: 0,
    //        y: -80 
    //    },
    //    {
    //        opacity: 1,
    //        y: 0,
    //        stagger: 0.08, 
    //        duration: 0.8,
    //        ease: 'power3.out',
    //        overwrite: 'auto'
    //    }
    //);
    //tl.fromTo('.individual__btn',
    //    {
    //        opacity: 0,
    //        y: 50,
    //    },

    //    {
    //        opacity: 1,
    //        y: 0,
    //        duration: 0.3,
    //    }
    //);
});