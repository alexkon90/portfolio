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












































const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circuits = [];
// Увеличена плотность элементов для заполнения пустот
const circuitCount = 250;

function init() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    circuits = [];
    for (let i = 0; i < circuitCount; i++) {
        // Приглушенные оттенки синего
        const hue = 205 + Math.random() * 25;
        const sat = 40 + Math.random() * 20;
        const lit = 45 + Math.random() * 25;
        // Немного больше прозрачности, чтобы наложения смотрелись лучше
        const alpha = 0.3 + Math.random() * 0.5;

        // Логика определения типа узла (чтобы не мигало, решаем заранее)
        const getNodeStyle = (probability) => {
             if (Math.random() > probability) return 'none';
             // 40% шанс, что узел будет контурным, иначе сплошным
             return Math.random() > 0.6 ? 'outline' : 'solid';
        };
        
        circuits.push({
            baseX: Math.random() * window.innerWidth,
            baseY: Math.random() * window.innerHeight,
            x: 0, y: 0,
            // Размеры сегментов
            len1: 20 + Math.random() * 120,
            len3: 30 + Math.random() * 150,
            angleDir: Math.random() > 0.5 ? 1 : -1,
            bendType: Math.random() > 0.5 ? 0 : 1,
            // Базовый размер теперь варьируется сильнее
            size: 0.8 + Math.random() * 3.5,
            color: `hsla(${hue}, ${sat}%, ${lit}%, ${alpha})`,
            phase: Math.random() * Math.PI * 2,
            speedX: 0.2 + Math.random() * 0.4,
            speedY: 0.2 + Math.random() * 0.3,
            
            // Заранее определяем стили узлов
            startType: Math.random() > 0.8 ? 'outline' : 'solid', // Начальный почти всегда есть
            midType: getNodeStyle(0.5), // Средний с вероятностью 50%
            endType: getNodeStyle(0.4)  // Конечный с вероятностью 60%
        });
    }
}

function drawCircuit(c) {
    ctx.save();
    ctx.strokeStyle = c.color;
    ctx.fillStyle = c.color;
    // Базовая толщина линий немного уменьшена из-за плотности
    ctx.lineWidth = 1.0; 

    const x = c.baseX + c.x;
    const y = c.baseY + c.y;

    // --- Рисуем линии ---
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    let curX = x + c.len1;
    let curY = y;
    ctx.lineTo(curX, curY);

    if (c.bendType === 0) { 
        curX += 25;
        curY += 25 * c.angleDir;
    } else { 
        curY += 30 * c.angleDir;
    }
    ctx.lineTo(curX, curY);

    curX += c.len3;
    ctx.lineTo(curX, curY);
    ctx.stroke();

    // --- Рисуем узлы ---
    // Функция отрисовки узла с учетом его типа и множителя размера
    const drawNode = (nx, ny, type, sizeMultiplier) => {
        if (type === 'none') return;

        const finalSize = c.size * sizeMultiplier;
        
        ctx.beginPath();
        ctx.arc(nx, ny, finalSize, 0, Math.PI * 2);

        if (type === 'outline') {
             // Для контурных кружков делаем линию чуть толще
             const oldWidth = ctx.lineWidth;
             ctx.lineWidth = oldWidth * 1.5;
             ctx.stroke();
             ctx.lineWidth = oldWidth; // Возвращаем толщину
        } else {
             ctx.fill();
        }
    };

    // Рисуем узлы с разными множителями размера
    drawNode(x, y, c.startType, 2.5); // Начальный побольше
    drawNode(x + c.len1, y, c.midType, 1.5); // Средний поменьше
    drawNode(curX, curY, c.endType, 2.0); // Конечный средний

    ctx.restore();
}

function animate() {
    // Фон чуть темнее для контраста
    ctx.fillStyle = '#242638'; 
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const t = Date.now() * 0.001;

    circuits.forEach(c => {
        // Значительная амплитуда движения
        c.x = Math.sin(t * c.speedX + c.phase) * 50;
        c.y = Math.cos(t * c.speedY + c.phase) * 30;

        drawCircuit(c);
        
        // Зацикливание по горизонтали (на всякий случай, хотя они привязаны к базе)
        if (c.baseX > window.innerWidth + 200) c.baseX = -200;
        if (c.baseX < -200) c.baseX = window.innerWidth + 200;
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();




