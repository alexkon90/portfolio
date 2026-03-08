//function initMobileMenu() {
//    // Mobile menu
//    const menu = document.querySelectorAll('[data-menu]')
//    if (!menu.length) return

//}

//function initModal() {
//    // Modal
//    const modal = document.querySelector('[data-modal]')
//    if (!modal) return

//}


function initAccordion(selector, allowMultiple = false){
	const items = document.querySelectorAll(selector);

	items.forEach(item => {
		const button = item.querySelector('.accordeon_caption');
		const content = item.querySelector('.accordeon_content');

		if(item.classList.contains('open')){
			content.style.height = content.scrollHeight + 'px';
		}
		button.addEventListener('click', () => {
			const isOpen = item.classList.contains('open');
			if(!allowMultiple){
				items.forEach(el => {
					if(el !== item && el.classList.contains('open')){
						const c = el.querySelector('.accordeon_content');
						c.style.height = c.scrollHeight + 'px';
						requestAnimationFrame(()=>{
							c.style.height = '0px';
						});
						el.classList.remove('open');
					}
				});
			}
			if(isOpen){
				content.style.height = content.scrollHeight + 'px';
				requestAnimationFrame(()=>{
					content.style.height = '0px';
				});
				item.classList.remove('open');
			}else{
				item.classList.add('open');
				content.style.height = '0px';
				requestAnimationFrame(()=>{
					content.style.height = content.scrollHeight + 'px';
				});
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
    initAccordion('.benefits-faq-item', false); // Если надо несколько открытых - ставим true
    initAccordion('.address-acrd-item', false); // Если надо несколько открытых - ставим true
});