function initMobileMenu() {
    // Mobile menu
    const menu = document.querySelectorAll('[data-menu]')
    if (!menu.length) return

}

function initTabs() {
    // Tabs
    const tabs = document.querySelectorAll('[data-tabs]')
    if (!tabs.length) return

}

function initAccordion() {
    // Accordion
    const accordion = document.querySelector('[data-accordion]')
    if (!accordion) return

}

function initModal() {
    // Modal
    const modal = document.querySelector('[data-modal]')
    if (!modal) return

}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTabs();
    initAccordion();
    initModal();
});