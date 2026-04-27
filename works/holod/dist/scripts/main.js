document.addEventListener('DOMContentLoaded', () => {
    // Mainarticles carousel
    const mainarticles_carousel = new Swiper('.mainarticles-carousel', {
        //loop: true,
        slidesPerView: 1.3,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainarticles-carousel__next',
            prevEl: '.mainarticles-carousel__prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2.3,
            },
            1024: {
                slidesPerView: 3.3,
            },
            1450: {
                slidesPerView: 4.3,
            }
        }
    });

    // Mainabout carousel
    const mainabout_carousel = new Swiper('.mainabout-gallery__slider', {
        //loop: true,
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainabout-gallery__next',
            prevEl: '.mainabout-gallery__prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2.1,
            },
            1450: {
                slidesPerView: 2.1,
            }
        }
    });
    
    // Mainstages carousel
    const mainstages_carousel = new Swiper('.mainstages-carousel', {
        //loop: true,
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.mainstages-carousel__next',
            prevEl: '.mainstages-carousel__prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2.1,
            },
            1450: {
                slidesPerView: 4,
            }
        }
    });

    // Maincases carousel
    const maincases_carousel = new Swiper('.maincases-carousel', {
        //loop: true,
        slidesPerView: 1.1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.maincases-carousel__next',
            prevEl: '.maincases-carousel__prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2.1,
            },
            1450: {
                slidesPerView: 3,
            }
        }
    });

    // Products carousel
    const products_carousel = new Swiper('.other-products-carousel', {
        //loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
            nextEl: '.other-products-carousel__next',
            prevEl: '.other-products-carousel__prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            1450: {
                slidesPerView: 4,
            }
        }
    });
});