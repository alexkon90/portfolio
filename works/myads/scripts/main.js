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








// Используем переменные из твоего старого скрипта
const mapUrl = 'https://unpkg.com/three-globe/example/img/earth-water.png';
const ROTATION_SPEED = 0.005; 

const container = document.querySelector('.globe-wrapper');
const width = container.clientWidth;
const height = container.clientHeight;

// 1. СЦЕНА И РЕНДЕР
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const globeGroup = new THREE.Group();
scene.add(globeGroup);

// 2. СОЗДАНИЕ МАТЕРИКОВ (Логика из твоего скрипта)
const loader = new THREE.TextureLoader();
loader.crossOrigin = 'anonymous';

loader.load(mapUrl, (texture) => {
    // Используем SphereGeometry для распределения точек
    // 200x200 дает хорошую плотность как в твоем Canvas-скрипте
    const geometry = new THREE.SphereGeometry(5, 200, 200);
    
    const material = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x82dcff, // Твой цвет rgba(130, 220, 255)
        transparent: true,
        opacity: 0.8
    });

    // Шейдер для фильтрации материков (аналог твоего brightness < 50)
    material.onBeforeCompile = (shader) => {
        shader.uniforms.uMask = { value: texture };
        shader.vertexShader = `
            varying vec2 vUv;
            ${shader.vertexShader}
        `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
            vUv = uv;`
        );
        shader.fragmentShader = `
            uniform sampler2D uMask;
            varying vec2 vUv;
            ${shader.fragmentShader}
        `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
            vec4 mask = texture2D(uMask, vUv);
            // В твоем скрипте была инверсия (dark = land), 
            // в этой текстуре земля светлая, поэтому проверяем яркость
            if (mask.r < 0.1) discard; 
            vec4 diffuseColor = vec4( diffuse, opacity );
            `
        );
    };

    const points = new THREE.Points(geometry, material);
    globeGroup.add(points);
});

// 3. ОКЕАНИЧЕСКАЯ СЕТКА (oceanPoints из твоего скрипта)
const oceanGeom = new THREE.SphereGeometry(4.98, 40, 40);
const oceanMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x64b4ff, // Твой цвет 100, 180, 255
    transparent: true,
    opacity: 0.2
});
const oceanPoints = new THREE.Points(oceanGeom, oceanMat);
globeGroup.add(oceanPoints);

// 4. ПАУТИНА СЕТИ (networkPoints + maxDist из твоего скрипта)
const netGeom = new THREE.IcosahedronGeometry(6.5, 2); 
const netMat = new THREE.LineBasicMaterial({ 
    color: 0x64c8ff, 
    transparent: true, 
    opacity: 0.2 
});
const wireframe = new THREE.WireframeGeometry(netGeom);
const networkLines = new THREE.LineSegments(wireframe, netMat);
globeGroup.add(networkLines);

// Точки в узлах сети
const nodes = new THREE.Points(
    netGeom, 
    new THREE.PointsMaterial({ size: 0.08, color: 0x96e6ff })
);
globeGroup.add(nodes);

// АНИМАЦИЯ
function animate() {
    requestAnimationFrame(animate);
    
    // Вращение как в твоем скрипте
    globeGroup.rotation.y += ROTATION_SPEED;
    
    // Небольшое покачивание для объема
    globeGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.05;
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();