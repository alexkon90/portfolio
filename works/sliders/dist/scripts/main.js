document.addEventListener('DOMContentLoaded', () => {
    // Mainprojects carousel
    const mainprojects_carousel = new Swiper('.mainprojects-carousel', {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        pagination: {
            el: '.mainprojects-carousel .swiper-pagination',
        },
        navigation: {
            nextEl: '.mainprojects-carousel .swiper-button-next',
            prevEl: '.mainprojects-carousel .swiper-button-prev',
        },
    });

    // Mainteam carousel
    const mainteam_carousel = new Swiper('.mainteam-carousel', {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        navigation: {
            nextEl: '.mainteam-carousel .swiper-button-next',
            prevEl: '.mainteam-carousel .swiper-button-prev',
        },
    });
});