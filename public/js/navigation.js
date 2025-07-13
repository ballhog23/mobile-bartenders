// controls navigation bar and overlay navigation functionality
const htmlElement = document.documentElement;
const hamburgerButton = htmlElement.querySelector('.hamburger');
const navOverlayElement = htmlElement.querySelector('.nav-overlay');

window.addEventListener('resize', closeOverlayNavWithResize)
document.addEventListener('keydown', closeOverlayNavWithEscape);
hamburgerButton.addEventListener('click', navOverlayFunctionality)

// controls active state on navigation bar/overlay nav
const navLinksCollection = htmlElement.getElementsByClassName('nav-link');
const navLinksArray = Array.from(navLinksCollection);
const currentPath = window.location.pathname;

navLinksArray.forEach(link => {
    const linkPath = link.pathname;
    if (currentPath === linkPath) link.classList.add('current-page');
})

function navOverlayFunctionality() {
    isNavOverlayHidden() ? openOverlayNav() : closeOverlayNav();
}

function isNavOverlayHidden() {
    return navOverlayElement.classList.contains('hidden');
}

function closeOverlayNav() {
    htmlElement.classList.remove('overlay-nav-open');
    hamburgerButton.classList.remove('open');
    navOverlayElement.classList.add('hidden');
}

function closeOverlayNavWithEscape(event) {
    const currentKey = event.key;
    if (isNavOverlayHidden() === false && currentKey === 'Escape') closeOverlayNav();
}

function closeOverlayNavWithResize(event) {
    if (isNavOverlayHidden() === false && window.innerWidth > 768) closeOverlayNav();
}

function openOverlayNav() {
    htmlElement.classList.add('overlay-nav-open');
    hamburgerButton.classList.add('open');
    navOverlayElement.classList.remove('hidden');
}