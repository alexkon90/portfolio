(function () {

    "use strict";

    //===== Prealoder

    window.onload = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var y = window.pageYOffset;
        if (y > 40) {
            header_navbar.classList.add("sticky");
        }
        window.setTimeout(fadeout, 200);
    }

    function fadeout() {
        // document.querySelector('.preloader').style.opacity = '0';
        // document.querySelector('.preloader').style.display = 'none';
    }



    /*=====================================
    Sticky
    ======================================= */


    window.addEventListener('scroll', function (event) {
        var header_navbar = document.querySelector(".navbar-area");
        var y = window.pageYOffset;
        if (y > 40) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }
    });




    //===== navbar-toggler
    let navbarToggler = document.querySelector(".navbar-toggler");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    })

    $(document).on('click', 'section, footer, .header .but-red2', function () {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').removeClass('active');
        $('.navbar-toggler').addClass('collapsed');

    })



    /*	
    
    if (document.documentElement.clientWidth > 1200) {
    $(window).scroll(function(e){
      parallax();
    });
    function parallax(){
      var scrolled = (($(window).scrollTop() - 600) / 11 - 1);
      $('.home #parallax').css('background-position', '0 '+(-scrolled)+'px');
    }
    }*/



    $('.help').owlCarousel({
        loop: true,
        margin: 32,
        nav: false,
        navText: ["Предыдущий", "Следующий"],
        responsive: {
            0: {
                items: 1.2
            },
            550: {
                items: 1.4
            },
            768: {
                items: 1.8
            },
            992: {
                items: 2.3
            },
            1280: {
                items: 3
            }
        }
    })

    $('.team').owlCarousel({
        loop: true,
        margin: 32,
        nav: false,
        navText: ["Предыдущий", "Следующий"],
        responsive: {
            0: {
                items: 1.2
            },
            550: {
                items: 1.4
            },
            768: {
                items: 1.8
            },
            992: {
                items: 2.3
            },
            1280: {
                items: 3
            }
        }
    })

    $('.reviews').owlCarousel({
        loop: true,
        margin: 32,
        nav: false,
        navText: ["Предыдущий", "Следующий"],
        responsive: {
            0: {
                items: 1.2
            },
            550: {
                items: 1.4
            },
            768: {
                items: 1.8
            },
            992: {
                items: 2.3
            },
            1280: {
                items: 3
            }
        }
    })


    $('.owl-dot').each(function (index) {
        $(this).attr('aria-label', 'Перейти к слайду ' + (index + 1));
    });


})();


// ====== scroll top js
function scrollTo(element, to = 0, duration = 1000) {

    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (() => {

        currentTime += increment;

        // const val = Math.easeInOutQuad(currentTime, start, change, duration);

        // element.scrollTop = val;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    });

    animateScroll();
};

Math.easeInOutQuad = function (t, b, c, d) {

    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

document.querySelector('.scroll-top').onclick = function () {
    scrollTo(document.documentElement);
}

var elm = document.querySelector('#main-header');
var ms = new MenuSpy(elm);

jQuery(document).ready(function ($) {


    $(".form").submit(function () {
        event.preventDefault();
        var th = $(this);
        var data = new FormData();

        if (th.find("input[type=checkbox]").prop("checked") == false) {
            $(".confid").addClass('error');
            return false;
        };

        // Сбор данных из обычных полей
        th.find(':input[name]').not('[type="file"]').each(function () {
            var field = $(this);
            data.append(field.attr('name'), field.val());
        });

        // Сбор данных о файле
        if (th.find('input[type="file"]').length) {
            var filesField = th.find('input[type="file"]');
            var fileName = filesField.attr('name');
            var file = filesField.prop('files')[0];
            data.append(fileName, file);
        }

        th.find('.btn img').show();

        $.ajax({
            type: "POST",
            url: "/wp-content/themes/profmaster/mail.php",
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            //  dataType: 'json',
        }).done(function () {
            console.log(123);
            var pp_suc = th.find('.success');
            pp_suc.fadeIn().addClass('active');
            setTimeout(function () {
                th.trigger("reset");
                pp_suc.fadeOut().removeClass('active');
                th.find('.btn img').hide();
            }, 3500);
        });
        return false;
    });

    $('.linkProdukt').attr('value', document.location.href);

    $(".confid > input:checkbox").on("change", function () {
        $(".confid").removeClass('error');
    });


    // маска на инпут
    $("input[type='tel']").click(function () {
        $(this).setCursorPosition(3);
    }).mask("+7(999) 999-9999");

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };


    $('body').on('click', '.number-minus, .number-plus', function () {
        var $row = $(this).closest('.number');
        var $input = $row.find('.number-text');
        var step = $row.data('step');
        var val = parseFloat($input.val());
        if ($(this).hasClass('number-minus')) {
            val -= step;
        } else {
            val += step;
        }
        $input.val(val);
        $input.change();
        return false;
    });

    $('body').on('change', '.number-text', function () {
        var $input = $(this);
        var $row = $input.closest('.number');
        var step = $row.data('step');
        var min = parseInt($row.data('min'));
        var max = parseInt($row.data('max'));
        var val = parseFloat($input.val());
        if (isNaN(val)) {
            val = step;
        } else if (min && val < min) {
            val = min;
        } else if (max && val > max) {
            val = max;
        }
        $input.val(val);
    });


    // FAQ
    $(function () {
        let el = $('.faq-accordeon-item__title');
        el.click(function () {
            let checkedElement = $(this).next(),
                visibleElement = $('.faq-accordeon-item__content:visible');

            visibleElement.stop().animate({ 'height': 'toggle' }, 300).parent().removeClass('active');
            if ((checkedElement.is('.faq-accordeon-item__content')) && (!checkedElement.is(':visible'))) {
                checkedElement.stop().animate({ 'height': 'toggle' }, 300).parent().addClass('active');
                return false;
            }
            if ((checkedElement.is('.faq-accordeon-item__content')) && (checkedElement.is(':visible'))) {
                return false;
            }
        });
    });

    // Smooth scroll
    $("a.scrollto").click(function () {

        let elementClick = $(this).attr("href");
        let headerHeight = $("#main-header").outerHeight();
        let destination = $(elementClick).offset().top - headerHeight;

        $("html, body").animate({
            scrollTop: destination
        }, 600);

        return false;
    });
});