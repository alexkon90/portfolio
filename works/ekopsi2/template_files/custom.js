const slider = new Swiper('.solutions-carousel', {
    slidesPerView: 1.2,
    spaceBetween: 10,
    speed: 600,
    navigation: {
        prevEl: '.solutions-carousel__prev',
        nextEl: '.solutions-carousel__next',
    },
    breakpoints: {
        768: {
            slidesPerView: 2.2,
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 28,
        },
        1600: {
            slidesPerView: 3,
        },
    },
    on: {
        init(swiper) {
            updateSliderUI(swiper);
        },

        slideChange(swiper) {
            updateSliderUI(swiper);
        },

        breakpoint(swiper) {
            updateSliderUI(swiper);
        }
    }
});

function updateSliderUI(swiper) {
    const totalPages = Math.ceil(
        swiper.slides.length - swiper.params.slidesPerView + 1
    );

    const currentPage = swiper.activeIndex + 1;

    document.querySelector('.solutions-carousel__current').textContent =
        String(currentPage).padStart(2, '0');

    document.querySelector('.solutions-carousel__total').textContent =
        String(totalPages).padStart(2, '0');

    document.querySelector('.solutions-carousel__progress-fill').style.width =
        `${(currentPage / totalPages) * 100}%`;
}