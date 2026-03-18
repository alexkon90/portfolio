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