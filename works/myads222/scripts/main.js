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
const canvas = document.getElementById('techCanvas');
const ctx = canvas.getContext('2d');

let width, height, nodes = [];
const colors = ['#fff', '#a69fd5', '#a69fd5', '#b3d4ff'];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    nodes = [];

    // Очень высокая плотность: 450 узлов
    const nodeCount = 450; 
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            type: Math.floor(Math.random() * 5), 
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 1,
            phase: Math.random() * Math.PI * 2,
            // Фиксируем логику изгиба, чтобы не было мигания (эпилепсии)
            bendType: Math.random() > 0.5 ? 'ortho' : 'diag',
            breakPointPct: 0.2 + Math.random() * 0.6
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Отрисовка линий
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
        // Проверяем только следующие 15 узлов в массиве для оптимизации и плотности
        for (let j = i + 1; j < i + 15 && j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Соединяем узлы, если они относительно близко
            if (dist < 250) {
                ctx.beginPath();
                ctx.strokeStyle = a.color + '25'; // Прозрачность 15% (HEX 25)
                ctx.moveTo(a.x, a.y);
                
                let breakX = a.x + dx * a.breakPointPct;
                
                if (a.bendType === 'ortho') {
                    // Прямоугольный перелом
                    ctx.lineTo(breakX, a.y);
                    ctx.lineTo(breakX, b.y);
                } else {
                    // Косой перелом 45°
                    let slope = Math.abs(dy);
                    let dir = dx > 0 ? 1 : -1;
                    ctx.lineTo(breakX, a.y);
                    ctx.lineTo(breakX + (slope * dir), b.y);
                }
                
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }

    // Отрисовка узлов (Character со скриншота)
    nodes.forEach(node => {
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.fillStyle = node.color;
        ctx.strokeStyle = node.color;

        switch(node.type) {
            case 0: // Точка
                ctx.beginPath();
                ctx.arc(0, 0, node.size * 1.5, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 1: // Кольцо
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, node.size * 2.5, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 2: // Кольцо с точкой
                ctx.beginPath();
                ctx.arc(0, 0, node.size * 3, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, 1, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 3: // Сдвоенное кольцо
                ctx.beginPath();
                ctx.arc(0, 0, node.size * 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, node.size * 4, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 4: // Прямоугольный чип
                ctx.fillRect(-2, -1, 4, 2);
                break;
        }
        ctx.restore();
    });
}

function animate() {
    // Еле заметный дрейф
    nodes.forEach(n => {
        n.x += Math.sin(Date.now() / 10000 + n.phase) * 0.05;
    });
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();




