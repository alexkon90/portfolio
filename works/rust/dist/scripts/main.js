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
        spaceBetween: 20,
        slidesPerView: 'auto', 
        centeredSlides: false, 
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1280: {
                slidesPerView: 3,
            }
        }
    });
});