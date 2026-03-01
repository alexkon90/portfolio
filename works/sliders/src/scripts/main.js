document.addEventListener('DOMContentLoaded', () => {
    // Mainprojects carousel
    const mainprojects = new Swiper('.mainprojects-carousel', {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        observer: true,
        observeParents: true,
        //on: {
        //    slideChangeTransitionStart(swiper) {
        //        swiper.update();
        //    }
        //},
        pagination: {
            el: '.mainprojects-carousel .swiper-pagination',
        },
        navigation: {
            nextEl: '.mainprojects-carousel .swiper-button-next',
            prevEl: '.mainprojects-carousel .swiper-button-prev',
        },
    });

    // Mainteam carousel
    const mainteam = new Swiper('.mainteam-carousel', {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.mainteam-carousel .swiper-button-next',
            prevEl: '.mainteam-carousel .swiper-button-prev',
        },
    });

    // Mainprojects carousel
    const splide = new Splide('.splide', {
        type: 'loop',
        focus: 'center',
        autoWidth: true,
        gap: '14px',
        arrows: true,
        pagination: true,
        speed: 600,
    }).mount();

    //splide.on('mounted move', () => {
    //    document.querySelectorAll('.splide__slide')
    //        .forEach(slide => slide.classList.remove('is-active-slide'));

    //    const active = splide.Components.Slides.getAt(splide.index);
    //    if (active) active.slide.classList.add('is-active-slide');
    //});

    //splide.on('mounted', () => {
    //    splide.go(0);
    //});

});