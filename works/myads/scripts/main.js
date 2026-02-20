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


// Глобус
const canvas = document.getElementById('globeCanvas');
const ctx = canvas.getContext('2d');
const container = canvas.parentElement;

let width, height, continentPoints = [], oceanPoints = [], networkPoints = [];
let radius, networkRadius;
let angle = 0;
const ROTATION_SPEED = 0.008; 
const mapUrl = 'https://unpkg.com/three-globe/example/img/earth-water.png'; 

function init() {
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    radius = Math.min(width, height) * 0.35;
    networkRadius = radius * 1.3; 

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = mapUrl;
    img.onload = () => {
        const tCanvas = document.createElement('canvas');
        const tCtx = tCanvas.getContext('2d');
        tCanvas.width = img.width;
        tCanvas.height = img.height;
        tCtx.drawImage(img, 0, 0);
        
        const data = tCtx.getImageData(0, 0, tCanvas.width, tCanvas.height).data;
        continentPoints = [];
        oceanPoints = [];
        
        const step = 5; 
        for (let y = 0; y < tCanvas.height; y += step) {
            for (let x = 0; x < tCanvas.width; x += step) {
                const i = (y * tCanvas.width + x) * 4;
                const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
                
                if (brightness < 50) {
                    const phi = (y / tCanvas.height) * Math.PI;
                    continentPoints.push({ 
                        sinPhi: Math.sin(phi),
                        cosPhi: Math.cos(phi),
                        theta: (x / tCanvas.width) * 2 * Math.PI 
                    });
                }
            }
        }
        
        for (let lat = 0; lat <= 180; lat += 12) {
            for (let lon = 0; lon <= 360; lon += 12) {
                const phi = (lat * Math.PI) / 180;
                oceanPoints.push({
                    sinPhi: Math.sin(phi),
                    cosPhi: Math.cos(phi),
                    theta: (lon * Math.PI) / 180
                });
            }
        }
        
        networkPoints = Array.from({length: 100}, () => {
            const phi = Math.random() * Math.PI;
            return {
                sinPhi: Math.sin(phi),
                cosPhi: Math.cos(phi),
                theta: Math.random() * Math.PI * 2
            };
        });

        animate();
    };
}

function project(p, r, rot) {
    const x = r * p.sinPhi * Math.cos(p.theta + rot);
    const y = r * p.cosPhi; 
    const z = r * p.sinPhi * Math.sin(p.theta + rot);
    const scale = 800 / (800 - z);
    return { x: width/2 + x*scale, y: height/2 + y*scale, z, alpha: (z + r) / (2 * r) };
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += ROTATION_SPEED;

    oceanPoints.forEach(p => {
        const pr = project(p, radius, angle);
        ctx.fillStyle = `rgba(100, 180, 255, ${pr.alpha * 0.25})`;
        ctx.fillRect(pr.x, pr.y, 1, 1);
    });

    const netProj = networkPoints.map(p => project(p, networkRadius, angle * 1.2));
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    
    const maxDist = width * 0.25;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < netProj.length; i++) {
        const p1 = netProj[i];
        if (p1.z > -networkRadius * 0.5) {
            for (let j = i + 1; j < netProj.length; j++) {
                const p2 = netProj[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx*dx + dy*dy;
                
                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    ctx.strokeStyle = `rgba(100, 200, 255, ${(1 - dist / maxDist) * 0.35})`;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                }
            }
            ctx.fillStyle = `rgba(150, 230, 255, ${p1.alpha * 0.8})`;
            ctx.fillRect(p1.x - 1, p1.y - 1, 2, 2);
        }
    }
    ctx.stroke();

    continentPoints.forEach(p => {
        const pr = project(p, radius, angle);
        const isFront = pr.z > 0;
        ctx.fillStyle = `rgba(130, 220, 255, ${pr.alpha * (isFront ? 1 : 0.1)})`;
        ctx.fillRect(pr.x, pr.y, isFront ? 1.5 : 0.8, isFront ? 1.5 : 0.8);
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();