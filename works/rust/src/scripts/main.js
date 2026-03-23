document.addEventListener('DOMContentLoaded', () => {
    initMegaMenu();
    initMegaMenuExpand();
    initSearch();
    initArticlesCarousel();
    initPromoCarousel();
    initTabsWithSwipers();
    initTabs();
    initTabsFAQ();
    initFooterAccordion();

    window.addEventListener('resize', () => {
        initPromoCarousel();
    });
});

// Mega menu
function initMegaMenu() {
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

                const target = menu.querySelector(`.mega-menu__section[data-tab="${id}"]`);
                target?.classList.add('active');
            });
        });
    });
}

// Expand columns
function initMegaMenuExpand() {
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
}

// Search
function initSearch() {
    const searchBtn = document.querySelector('.js_search-btn');
    const searchClose = document.querySelector('.header-search__close');
    const searchBlock = document.querySelector('.header-search');

    if (!searchBlock) return;

    const input = searchBlock.querySelector('.header-search__input');
    const suggest = searchBlock.querySelector('.header-search__suggest');
    const blocks = suggest.querySelectorAll('.header-search__block');
    const noResults = suggest.querySelector('.header-search__noresults');

    searchBtn?.addEventListener('click', () => {
        searchBlock.classList.add('open');
        document.body.classList.add('lock');
        input?.focus();
    });

    searchClose?.addEventListener('click', () => {
        document.body.classList.remove('lock');
        searchBlock.classList.remove('open');
        searchBlock.classList.remove('focused');
        suggest.classList.remove('active');
    });

    input?.addEventListener('focus', () => {
        searchBlock.classList.add('focused');
    });

    input?.addEventListener('input', () => {
        const value = input.value.trim().toLowerCase();
        searchBlock.classList.toggle('active', value !== '');

        if (!value) {
            blocks.forEach(b => b.style.display = 'block');
            noResults.style.display = 'none';
            return;
        }

        let hasVisible = false;

        blocks.forEach(block => {
            const items = block.querySelectorAll('.hs-item');
            let blockHasMatch = false;

            items.forEach(item => {
                const title = item.querySelector('.hs-item__title')?.textContent.toLowerCase() || '';
                const match = title.includes(value);

                item.style.display = match ? 'flex' : 'none';
                if (match) blockHasMatch = true;
            });

            block.style.display = blockHasMatch ? 'block' : 'none';
            if (blockHasMatch) hasVisible = true;
        });

        noResults.style.display = hasVisible ? 'none' : 'flex';
    });

    document.addEventListener('click', (e) => {
        const clickedOutside = !e.target.closest('.header-search') && !e.target.closest('.js_search-btn');
        if (clickedOutside) {
            searchBlock.classList.remove('open');
            searchBlock.classList.remove('focused');
            searchBlock.classList.remove('active');
            input.value = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchBlock.classList.remove('open');
            searchBlock.classList.remove('focused');
            searchBlock.classList.remove('active');
            input.value = '';
        }
    });
}

// Promo carousel
let promoCarousel;

function initPromoCarousel() {
    if (window.innerWidth <= 767 && !promoCarousel) {
        promoCarousel = new Swiper('.promo-box', {
            slidesPerView: 'auto',
            loop: true,
            initialSlide: 1,
            centeredSlides: true,
            centeredSlidesBounds: true,
        });
    } else if (window.innerWidth > 767 && promoCarousel) {
        promoCarousel.destroy(true, true);
        promoCarousel = null;
    }
}

// Articles carousel
function initArticlesCarousel() {
    new Swiper('.articles-carousel', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 'auto',
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3 }
        }
    });
}

// Tabs with swipers 
function initTabsWithSwipers() {
    const catalogBtn = document.querySelector('.js_catalog-btn');
    const catalogClose = document.querySelector('.catalog-menu__close');
    const catalogMenu = document.querySelector('.catalog-menu');
    const tabBlocks = document.querySelectorAll('.catalog-menu__wrapper');
    const isMobile = window.matchMedia('(max-width: 767px)');

    function debounce(fn, delay = 200) {
        let t;
        return () => {
            clearTimeout(t);
            t = setTimeout(fn, delay);
        };
    }

    catalogBtn?.addEventListener('click', () => {
        catalogMenu.classList.add('open');
        document.body.classList.add('lock');
    });

    catalogClose?.addEventListener('click', () => {
        document.body.classList.remove('lock');
        catalogMenu.classList.remove('open');
    });

    tabBlocks.forEach(block => {
        const buttons = block.querySelectorAll('.catalog-menu__tab');
        const panes = block.querySelectorAll('.catalog-menu__section');

        function initSwipersIn(container) {
            if (!isMobile.matches) return;

            container.querySelectorAll('.catalog-menu__carousel').forEach(el => {
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

        function destroySwipersIn(container) {
            container.querySelectorAll('.catalog-menu__carousel').forEach(el => {
                el.swiperInstance?.destroy(true, true);
                el.swiperInstance = null;
            });
        }

        function updateSwipersIn(container) {
            container.querySelectorAll('.catalog-menu__carousel')
                .forEach(el => el.swiperInstance?.update());
        }

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.tab;

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                panes.forEach(pane => {
                    const isActive = pane.dataset.tab === id;

                    pane.classList.toggle('active', isActive);

                    if (isActive) {
                        initSwipersIn(pane);
                        requestAnimationFrame(() => updateSwipersIn(pane));
                    } else {
                        destroySwipersIn(pane);
                    }
                });
            });
        });

        const activePane = block.querySelector('.catalog-menu__section.active');
        if (activePane) {
            initSwipersIn(activePane);
            requestAnimationFrame(() => updateSwipersIn(activePane));
        }

        window.addEventListener('resize', debounce(() => {
            panes.forEach(pane => {
                if (pane.classList.contains('active')) {
                    destroySwipersIn(pane);
                    initSwipersIn(pane);
                    requestAnimationFrame(() => updateSwipersIn(pane));
                } else {
                    destroySwipersIn(pane);
                }
            });
        }));
    });
}

// Simple tabs
function initTabs() {
    document.querySelectorAll('.tabs').forEach(block => {
        const buttons = block.querySelectorAll('.tabs__btn');
        const panes = block.querySelectorAll('.tabs__section');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.tab;

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                panes.forEach(p => {
                    p.classList.toggle('active', p.dataset.tab === id);
                });
            });
        });
    });
}

// FAQ
function initTabsFAQ() {
    const blocks = document.querySelectorAll('.faq-accordion');

    blocks.forEach(block => {
        block.addEventListener('click', (e) => {
            const title = e.target.closest('.faq-accordion-item__title');
            if (!title) return;

            e.preventDefault();

            const item = title.closest('.faq-accordion-item');
            const items = block.querySelectorAll('.faq-accordion-item');

            const isActive = item.classList.contains('active');

            items.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Footer menu
function initFooterAccordion() {
    const sections = document.querySelectorAll('.footer__section');

    function isMobile() {
        return window.innerWidth <= 767;
    }

    sections.forEach(section => {
        const caption = section.querySelector('.footer__caption');
        const block = section.querySelector('.footer__block');

        if (!caption || !block) return;

        caption.addEventListener('click', (e) => {
            if (!isMobile()) return;
            e.preventDefault();

            const isActive = section.classList.contains('active');
            sections.forEach(s => {
                s.classList.remove('active');
                s.querySelector('.footer__block').style.maxHeight = null;
            });

            if (!isActive) {
                section.classList.add('active');
                block.style.maxHeight = block.scrollHeight + 'px';
            }
        });
    });
}

window.addEventListener('resize', () => {
    document.querySelectorAll('.footer__block').forEach(block => {
        block.style.maxHeight = null;
    });
    document.querySelectorAll('.footer__section').forEach(section => {
        section.classList.remove('active');
    });
});