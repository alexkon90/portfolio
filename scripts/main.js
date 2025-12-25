$(document).ready(function(){
	// Smooth scroll
	$("a.scrollto").click(function () {
	    var elementClick = $(this).attr("href")
	    var destination = $(elementClick).offset().top;
	    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 600);
	    return false;
	});

	// Hightlight menu
	$(window).scroll(function() { 
		if($(this).scrollTop()<100){
			$('.top-menu__link').removeClass('active');
		}
		if($(this).scrollTop()+100>$('#skills').offset().top){
			$('.top-menu__link').removeClass('active');
			$('.top-menu').find('a[href="#skills"]').addClass('active');
		}
		if($(this).scrollTop()+100>$('#benefits').offset().top){
			$('.top-menu__link').removeClass('active');
			$('.top-menu').find('a[href="#benefits"]').addClass('active');
		}
		if($(this).scrollTop()+100>$('#portfolio').offset().top){
			$('.top-menu__link').removeClass('active');
			$('.top-menu').find('a[href="#portfolio"]').addClass('active');
		}
		if($(this).scrollTop()+100>$('#contacts').offset().top){
			$('.top-menu__link').removeClass('active');
			$('.top-menu').find('a[href="#contacts"]').addClass('active');
		}
	});
}); 