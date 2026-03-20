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
        document.body.classList.add('lock');
    });
    catalogClose.addEventListener('click', () => {
        document.body.classList.remove('lock');
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
//const swipers = document.querySelectorAll('.catalog-menu__carousel');

//swipers.forEach((el) => {
//    let swiper = null;

//    const init = () => {
//        if (window.innerWidth < 768 && !swiper) {
//            swiper = new Swiper(el, {
//                slidesPerView: 'auto',
//                spaceBetween: 10,
//                pagination: {
//                    el: '.swiper-pagination',
//                },
//            });
//        } else if (window.innerWidth >= 768 && swiper) {
//            swiper.destroy(true, true);
//            swiper = null;
//        }
//    };

//    init();
//    window.addEventListener('resize', init);
//});

//function initTabsWithSwipers() {
//    const tabBlocks = document.querySelectorAll('.catalog-menu__wrapper');

//    tabBlocks.forEach(block => {
//        const buttons = block.querySelectorAll('.catalog-menu__tab');
//        const panes = block.querySelectorAll('.catalog-menu__section');

//        // --- init swiper внутри конкретного контейнера
//        function initSwipersIn(container) {
//            const sliders = container.querySelectorAll('.catalog-menu__carousel');

//            sliders.forEach(el => {
//                if (el.swiperInstance) return;

//                if (window.innerWidth < 768) {
//                    el.swiperInstance = new Swiper(el, {
//                        slidesPerView: 'auto',
//                        spaceBetween: 10,
//                        pagination: {
//                            el: el.querySelector('.swiper-pagination'),
//                        },
//                    });
//                }
//            });
//        }

//        // --- destroy swiper внутри контейнера
//        function destroySwipersIn(container) {
//            const sliders = container.querySelectorAll('.catalog-menu__carousel');

//            sliders.forEach(el => {
//                if (el.swiperInstance) {
//                    el.swiperInstance.destroy(true, true);
//                    el.swiperInstance = null;
//                }
//            });
//        }

//        // --- клики по табам
//        buttons.forEach(btn => {
//            btn.addEventListener('click', () => {
//                const id = btn.dataset.tab;

//                // кнопки
//                buttons.forEach(b => b.classList.remove('active'));
//                btn.classList.add('active');

//                // контент + свайперы
//                panes.forEach(pane => {
//                    const isActive = pane.dataset.tab === id;

//                    pane.classList.toggle('active', isActive);

//                    if (isActive) {
//                        initSwipersIn(pane);
//                    } else {
//                        destroySwipersIn(pane);
//                    }
//                });
//            });
//        });

//        // --- init при загрузке (активный таб)
//        const activePane = block.querySelector('.catalog-menu__section.active');
//        if (activePane) {
//            initSwipersIn(activePane);
//        }

//        // --- resize
//        window.addEventListener('resize', () => {
//            panes.forEach(pane => {
//                if (pane.classList.contains('active')) {
//                    destroySwipersIn(pane);
//                    initSwipersIn(pane);
//                } else {
//                    destroySwipersIn(pane);
//                }
//            });
//        });
//    });
//}

//document.addEventListener('DOMContentLoaded', initTabsWithSwipers);

function initTabsWithSwipers() {
  const tabBlocks = document.querySelectorAll('.catalog-menu__wrapper');
  const isMobile = window.matchMedia('(max-width: 767px)');

  function debounce(fn, delay = 200) {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, delay);
    };
  }

  tabBlocks.forEach(block => {
    const buttons = block.querySelectorAll('.catalog-menu__tab');
    const panes = block.querySelectorAll('.catalog-menu__section');

    // --- init swiper внутри контейнера
    function initSwipersIn(container) {
      if (!isMobile.matches) return;

      const sliders = container.querySelectorAll('.catalog-menu__carousel');

      sliders.forEach(el => {
        if (el.swiperInstance) return;

        el.swiperInstance = new Swiper(el, {
          slidesPerView: 'auto',
          spaceBetween: 10,

          nested: true,
          touchMoveStopPropagation: true,

          pagination: {
            el: el.querySelector('.swiper-pagination'),
          },
        });
      });
    }

    // --- destroy swiper внутри контейнера
    function destroySwipersIn(container) {
      const sliders = container.querySelectorAll('.catalog-menu__carousel');

      sliders.forEach(el => {
        if (el.swiperInstance) {
          el.swiperInstance.destroy(true, true);
          el.swiperInstance = null;
        }
      });
    }

    // --- обновление swiper после показа
    function updateSwipersIn(container) {
      const sliders = container.querySelectorAll('.catalog-menu__carousel');

      sliders.forEach(el => {
        el.swiperInstance?.update();
      });
    }

    // --- переключение табов
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;

        // кнопки
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // контент
        panes.forEach(pane => {
          const isActive = pane.dataset.tab === id;

          pane.classList.toggle('active', isActive);

          if (isActive) {
            initSwipersIn(pane);

            requestAnimationFrame(() => {
              updateSwipersIn(pane);
            });

          } else {
            destroySwipersIn(pane);
          }
        });
      });
    });

    // --- init при загрузке
    const activePane = block.querySelector('.catalog-menu__section.active');
    if (activePane) {
      initSwipersIn(activePane);

      requestAnimationFrame(() => {
        updateSwipersIn(activePane);
      });
    }

    // --- resize (с debounce)
    window.addEventListener('resize', debounce(() => {
      panes.forEach(pane => {
        if (pane.classList.contains('active')) {
          destroySwipersIn(pane);
          initSwipersIn(pane);

          requestAnimationFrame(() => {
            updateSwipersIn(pane);
          });

        } else {
          destroySwipersIn(pane);
        }
      });
    }));
  });
}

document.addEventListener('DOMContentLoaded', initTabsWithSwipers);













//// Tabs
//function initTabs2() {
//    const tabBlocks = document.querySelectorAll('.catalog-menu__wrapper');

//    tabBlocks.forEach(block => {
//        const buttons = block.querySelectorAll('.catalog-menu__tab');
//        const panes = block.querySelectorAll('.catalog-menu__section');

//        buttons.forEach(btn => {
//            btn.addEventListener('click', () => {
//                const id = btn.dataset.tab;

//                // кнопки
//                buttons.forEach(b => b.classList.remove('active'));
//                btn.classList.add('active');

//                // контент
//                panes.forEach(pane => {
//                    pane.classList.toggle('active', pane.dataset.tab === id);
//                });
//            });
//        });
//    });
//}

//document.addEventListener('DOMContentLoaded', initTabs2);







// Tabs
function initTabs() {
    const tabBlocks = document.querySelectorAll('.tabs');

    tabBlocks.forEach(block => {
        const buttons = block.querySelectorAll('.tabs__btn');
        const panes = block.querySelectorAll('.tabs__section');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.tab;

                // кнопки
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // контент
                panes.forEach(pane => {
                    pane.classList.toggle('active', pane.dataset.tab === id);
                });
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTabs);



// Tabs 2
function initTabsAdvanced() {
    const blocks = document.querySelectorAll('.faq-accordion');

    blocks.forEach(block => {
        const items = block.querySelectorAll('.faq-accordion-item');

        items.forEach((item, index) => {
            const head = item.querySelector('.faq-accordion-item__title');

            head.addEventListener('click', () => {
                const isMobile = window.innerWidth < 768;

                if (isMobile) {
                    // accordion
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                } else {
                    // tabs
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTabsAdvanced);


