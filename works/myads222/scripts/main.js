$(document).ready(function(){
    // Menu
    $(".header-menu__btn").click(function(){
		$("body").addClass("lock");
		$(".header-menu").addClass("open");
	});
    $(".header-menu__close, .bg-menu").click(function(){
		$("body").removeClass("lock");
		$(".header-menu").removeClass("open");
	});

    // Header on scroll
    const header = document.querySelector('.header');
    const links = document.querySelectorAll('.header-menu__link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('header_scroll');
        } else {
            header.classList.remove('header_scroll');
        }
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;

                    links.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.6 }
    );
    sections.forEach(section => observer.observe(section));

    $('.header-menu__link').on('click', function(e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        const target = $(targetId);

        const headerHeight = $('.header').outerHeight();

        $("body").removeClass("lock");
		$(".header-menu").removeClass("open");

        $('html, body').animate({
            scrollTop: target.offset().top - headerHeight
        }, 600);
    });

    // Smooth scroll
    $("a.scrollto").click(function () {
        let elementClick = $(this).attr("href")
        let destination = $(elementClick).offset().top - 60;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 600);
        return false;
    });

    // About hover
    const images = document.querySelectorAll('.about-types-item');
    const labels = document.querySelectorAll('.about-types-item__caption_desk');

    function setActive(id) {
        images.forEach(img => {
            img.classList.toggle('active', img.dataset.id === id);
        });

        labels.forEach(label => {
            label.classList.toggle('active', label.dataset.id === id);
        });
    }
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            setActive(img.dataset.id);
        });
    });

    // Accordeon
    $(function () {
        $(document).on('click', '.faq-item__q', function (e) {
            e.preventDefault();

            const $caption = $(this);
            const $item = $caption.parent();
            const $content = $caption.next('.faq-item__a');

            if (!$content.length) return;

            $content.stop(true, true).slideToggle(300);
            $item.toggleClass('active');
        });
    });

	// Phone mask
	$(".input_phone").inputmask("+7 (999) 999 99 99");
    
	// Promo slider
	if($('.promo-slider').length > 0){
		$('.promo-slider').slick({
			//autoplay: true,
			//infinite: false,
			arrows: true,
			dots: false,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 767,
				settings: {
                    arrows: false,
                    adaptiveHeight: true,
                    dots: true,
				}
			}]
		});
	}

	// Possibilities slider
	if($('.possibilities-slider').length > 0){
		$('.possibilities-slider').slick({
			//autoplay: true,
			infinite: false,
			arrows: true,
			dots: false,
            fade: true,
			slidesToShow: 1,
			accessibility: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 767,
				settings: {
                    arrows: false,
                    adaptiveHeight: true,
                    dots: true,
				}
			}]
		});
	}
});



























































// Canvas 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circuits = [];
const circuitCount = 100;

function init() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    circuits = [];
    for (let i = 0; i < circuitCount; i++) {
        // Приглушенные оттенки синего (Hue: 210-230, Saturation: 30-50%, Lightness: 40-60%)
        const hue = 210 + Math.random() * 20;
        const sat = 30 + Math.random() * 20;
        const lit = 40 + Math.random() * 20;
        
        circuits.push({
            baseX: Math.random() * window.innerWidth,
            baseY: Math.random() * window.innerHeight,
            x: 0,
            y: 0,
            len1: 30 + Math.random() * 100,
            len3: 40 + Math.random() * 120,
            angleDir: Math.random() > 0.5 ? 1 : -1,
            bendType: Math.random() > 0.5 ? 0 : 1,
            size: Math.random() * 1.5 + 1,
            color: `hsla(${hue}, ${sat}%, ${lit}%, ${0.5 + Math.random() * 0.4})`,
            phase: Math.random() * Math.PI * 2,
            speedX: 0.2 + Math.random() * 0.4,
            speedY: 0.2 + Math.random() * 0.3,
            // Заранее определяем узлы, чтобы избежать мигания при отрисовке
            hasMidNode: Math.random() > 0.4,
            hasEndNode: Math.random() > 0.3
        });
    }
}

function drawCircuit(c) {
    ctx.save();
    ctx.strokeStyle = c.color;
    ctx.fillStyle = c.color;
    ctx.lineWidth = 1.2;

    const x = c.baseX + c.x;
    const y = c.baseY + c.y;

    ctx.beginPath();
    ctx.moveTo(x, y);
    
    let curX = x + c.len1;
    let curY = y;
    ctx.lineTo(curX, curY);

    if (c.bendType === 0) { 
        curX += 20;
        curY += 20 * c.angleDir;
    } else { 
        curY += 25 * c.angleDir;
    }
    ctx.lineTo(curX, curY);

    curX += c.len3;
    ctx.lineTo(curX, curY);
    ctx.stroke();

    // Отрисовка строго цельных кружков
    const drawNode = (nx, ny, isLarge) => {
        ctx.beginPath();
        ctx.arc(nx, ny, isLarge ? c.size * 3 : c.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
    };

    drawNode(x, y, true);
    if (c.hasMidNode) drawNode(x + c.len1, y, false);
    if (c.hasEndNode) drawNode(curX, curY, true);

    ctx.restore();
}

function animate() {
    // Темно-сизый/фиолетовый фон, чтобы синие линии выделялись
    ctx.fillStyle = '#2c2e43'; 
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const t = Date.now() * 0.001;

    circuits.forEach(c => {
        // Увеличена амплитуда движения (было 15 и 10, стало 45 и 25)
        c.x = Math.sin(t * c.speedX + c.phase) * 45;
        c.y = Math.cos(t * c.speedY + c.phase) * 25;

        drawCircuit(c);
        
        if (c.baseX + c.x > window.innerWidth + 100) c.baseX = -200;
        if (c.baseX + c.x < -200) c.baseX = window.innerWidth + 100;
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();