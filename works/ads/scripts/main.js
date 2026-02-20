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

// canvas 1
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circuits = [];
const circuitCount = 400; 

// Добавляем стили для canvas, чтобы он занимал весь экран
const style = document.createElement('style');
document.head.appendChild(style);

function init() {
    // Получаем размеры окна браузера
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Настройка для четкости на Retina-дисплеях
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    circuits = [];
    for (let i = 0; i < circuitCount; i++) {
        const hue = 205 + Math.random() * 25;
        const sat = 40 + Math.random() * 20;
        const lit = 45 + Math.random() * 25;
        // Немного уменьшаем прозрачность из-за высокой плотности
        const baseAlpha = 0.2 + Math.random() * 0.5;
        
        circuits.push({
            x: Math.random() * width,
            y: Math.random() * height,
            len1: 20 + Math.random() * 100,
            len3: 30 + Math.random() * 120,
            angleDir: Math.random() > 0.5 ? 1 : -1,
            bendType: Math.random() > 0.5 ? 0 : 1,
            // Чуть уменьшаем разброс размеров точек
            size: 0.5 + Math.random() * 2.5,
            
            color: `hsl(${hue}, ${sat}%, ${lit}%)`,
            maxAlpha: baseAlpha,
            
            linePhase: Math.random() * Math.PI * 2,
            // СКОРОСТЬ
            fadeSpeed: 2 + Math.random() * 2.2,
            
            startType: Math.random() > 0.6 ? 'outline' : 'solid',
            midType: Math.random() > 0.5 ? 'solid' : 'none',
            endType: Math.random() > 0.5 ? 'solid' : 'none'
        });
    }
}

function drawCircuit(c, t) {
    let curX = c.x + c.len1;
    let curY = c.y;
    let endX = curX;
    let endY = curY;

    if (c.bendType === 0) { 
        endX += 20;
        endY += 20 * c.angleDir;
    } else { 
        endY += 25 * c.angleDir;
    }
    
    let finalX = endX + c.len3;
    let finalY = endY;

    // --- 1. Анимация появления/исчезновения линий ---
    let fade = Math.sin(t * c.fadeSpeed + c.linePhase);
    // Линия видна только когда синус положителен
    let lineAlpha = fade > 0 ? fade * c.maxAlpha : 0; 
    
    if (lineAlpha > 0.01) {
        ctx.beginPath();
        ctx.globalAlpha = lineAlpha;
        ctx.strokeStyle = c.color;
        // Делаем линии чуть тоньше для лучшего вида при высокой плотности
        ctx.lineWidth = 1.0;
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(curX, curY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(finalX, finalY);
        ctx.stroke();
    }

    // --- 2. Статичные узлы ---
    ctx.globalAlpha = c.maxAlpha;
    ctx.fillStyle = c.color;
    ctx.strokeStyle = c.color;

    const drawNode = (nx, ny, type, sizeMult) => {
        if (type === 'none') return;
        ctx.beginPath();
        ctx.arc(nx, ny, c.size * sizeMult, 0, Math.PI * 2);
        if (type === 'outline') {
             ctx.lineWidth = 1.2; // Обводка контурных точек
             ctx.stroke();
        } else {
             ctx.fill();
        }
    };

    drawNode(c.x, c.y, c.startType, 2.5);
    drawNode(curX, curY, c.midType, 1.5);
    drawNode(finalX, finalY, c.endType, 2.0);
    
    ctx.globalAlpha = 1;
}

function animate() {
    ctx.fillStyle = '#242638'; 
    ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    const t = Date.now() * 0.001;

    circuits.forEach(c => {
        drawCircuit(c, t);
    });

    requestAnimationFrame(animate);
}


// Canvas 2
const wrapper2 = document.querySelector('.globe');
const canvas2 = document.getElementById('globe__canvas');
const ctx2 = canvas2.getContext('2d');

let netW2, netH2, cx2, cy2;
let nodes2 = [];
let links2 = [];

const NET_RADIUS2 = 300; 
let angleY2 = 0;
let angleX2 = 0;

function initNet2() {
    const dpr = window.devicePixelRatio || 1;
    netW2 = wrapper2.clientWidth;
    netH2 = wrapper2.clientHeight;
    cx2 = netW2 / 2;
    cy2 = netH2 / 2;

    canvas2.width = netW2 * dpr;
    canvas2.height = netH2 * dpr;
    ctx2.scale(dpr, dpr);

    createSphere2();
}

function createSphere2() {
    const numNodes = 150; 
    nodes2 = [];
    links2 = [];

    for (let i = 0; i < numNodes; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / numNodes);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        nodes2.push({
            x: NET_RADIUS2 * Math.sin(phi) * Math.cos(theta),
            y: NET_RADIUS2 * Math.cos(phi),
            z: NET_RADIUS2 * Math.sin(phi) * Math.sin(theta)
        });
    }

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const dx = nodes2[i].x - nodes2[j].x;
            const dy = nodes2[i].y - nodes2[j].y;
            const dz = nodes2[i].z - nodes2[j].z;
            
            if (Math.sqrt(dx*dx + dy*dy + dz*dz) < NET_RADIUS2 * 0.45) { 
                links2.push([i, j]);
            }
        }
    }
}

function project3D2(x, y, z) {
    let cosY = Math.cos(angleY2), sinY = Math.sin(angleY2);
    let cosX = Math.cos(angleX2), sinX = Math.sin(angleX2);

    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;

    const scale = 600 / (600 + z2);
    
    return {
        x: cx2 + x1 * scale,
        y: cy2 + y2 * scale,
        z: z2,
        scale: scale,
        alpha: Math.max(0.05, Math.min(1, (z2 + NET_RADIUS2 * 1.2) / (NET_RADIUS2 * 2)))
    };
}

function animateNet2() {
    ctx2.clearRect(0, 0, netW2, netH2);

    angleY2 += 0.003; 
    angleX2 = 0.2; 

    const proj2 = nodes2.map(n => project3D2(n.x, n.y, n.z));

    ctx2.lineWidth = 1;
    ctx2.beginPath();
    for (let i = 0; i < links2.length; i++) {
        const n1 = proj2[links2[i][0]];
        const n2 = proj2[links2[i][1]];
        
        if (n1.z > -NET_RADIUS2 * 0.8 || n2.z > -NET_RADIUS2 * 0.8) {
            ctx2.strokeStyle = `rgba(68, 170, 255, ${(n1.alpha + n2.alpha) / 2 * 0.5})`;
            ctx2.moveTo(n1.x, n1.y);
            ctx2.lineTo(n2.x, n2.y);
        }
    }
    ctx2.stroke();

    for (let i = 0; i < proj2.length; i++) {
        const p = proj2[i];
        if (p.z > -NET_RADIUS2) {
            ctx2.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx2.beginPath();
            ctx2.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
            ctx2.fill();
        }
    }

    requestAnimationFrame(animateNet2);
}


// Запуск 2 канвасов
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        init();       // Перезапуск первого канваса
        initNet2();   // Перезапуск второго канваса
    }
});

init();
initNet2();
animate();
animateNet2();



