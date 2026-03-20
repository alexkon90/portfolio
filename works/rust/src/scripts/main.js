//function initMobileMenu() {
//    // Mobile menu
//    const menu = document.querySelectorAll('[data-menu]')
//    if (!menu.length) return

//}

//function initTabs() {
//    // Tabs
//    const tabs = document.querySelectorAll('[data-tabs]')
//    if (!tabs.length) return

//}

//function initAccordion() {
//    // Accordion
//    const accordion = document.querySelector('[data-accordion]')
//    if (!accordion) return

//}

//function initModal() {
//    // Modal
//    const modal = document.querySelector('[data-modal]')
//    if (!modal) return

//}


document.addEventListener('DOMContentLoaded', () => {
    // Mega menu
    const megaMenus = document.querySelectorAll('.mega-menu');

    megaMenus.forEach(menu => {
        const categories = menu.querySelectorAll('.mega-menu__category');
        const sections = menu.querySelectorAll('.mega-menu__section');

        categories.forEach(cat => {
            cat.addEventListener('mouseenter', () => {
                const id = cat.dataset.tab;

                categories.forEach(c => c.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                cat.classList.add('active');
                
                const targetSection = menu.querySelector(`.mega-menu__section[data-tab="${id}"]`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    });


    document.querySelectorAll('.mega-menu__col').forEach(col => {
        const list = col.querySelector('.mega-menu__list');
        const btn = col.querySelector('.mega-menu__expand');
        const items = list.querySelectorAll('li');

        if (items.length > 8) {
            btn.classList.add('visible');
        }

        btn.addEventListener('click', () => {
            const isOpen = list.classList.toggle('open');
            btn.textContent = isOpen ? 'Скрыть' : 'Ещё';
            btn.classList.toggle('is-active', isOpen);
        });
    });

    // Search
    const searchBtn = document.querySelector('.js_search-btn');
    const searchClose = document.querySelector('.header-search__close');
    const searchBlock = document.querySelector('.header-search');

    searchBtn.addEventListener('click', () => {
        searchBlock.classList.add('open');
    });
    searchClose.addEventListener('click', () => {
        searchBlock.classList.remove('open');
    });

    document.querySelectorAll('.header-search__input').forEach(input => {
        input.addEventListener('input', () => {
            const parent = document.querySelector('.header-search__suggest');

            if (input.value.trim() !== '') {
                parent.classList.add('active');
            } else {
                parent.classList.remove('active');
            }
        });
    });

    // Menu catalog
    const catalogBtn = document.querySelector('.js_catalog-btn');
    const catalogClose = document.querySelector('.catalog-menu__close');
    const catalogMenu = document.querySelector('.catalog-menu');

    catalogBtn.addEventListener('click', () => {
        catalogMenu.classList.add('open');
    });
    catalogClose.addEventListener('click', () => {
        catalogMenu.classList.remove('open');
    });

    // Articles carousel
    const articles_carousel = new Swiper('.articles-carousel', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 'auto', 
        centeredSlides: false, 
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
            }
        }
    });
});


// Promo carousel
let swiper;

function initSwiper() {
    if (window.innerWidth <= 767 && !swiper) {
        swiper = new Swiper('.promo-box', {
            slidesPerView: 'auto', 
            loop: true,
            initialSlide: 1,
            centeredSlides: true,
            centeredSlidesBounds: true, 
        });
    } else if (window.innerWidth > 767 && swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }
}

initSwiper();
window.addEventListener('resize', initSwiper);

// Catalog carousel
let swiper2;
function initSwiper2() {
    if (window.innerWidth <= 767 && !swiper2) {
        swiper2 = new Swiper('.catalog-carousel', {
            slidesPerView: 'auto', 
            loop: true,
            spaceBetween: 10,
        });
    } else if (window.innerWidth > 767 && swiper2) {
        swiper2.destroy(true, true);
        swiper2 = null;
    }
}

initSwiper2();
window.addEventListener('resize', initSwiper2);

// Catalog carousel
const swipers = document.querySelectorAll('.catalog-menu__carousel');

swipers.forEach((el) => {
    let swiper = null;

    const init = () => {
        if (window.innerWidth < 768 && !swiper) {
            swiper = new Swiper(el, {
                slidesPerView: 'auto',
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        } else if (window.innerWidth >= 768 && swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    };

    init();
    window.addEventListener('resize', init);
});