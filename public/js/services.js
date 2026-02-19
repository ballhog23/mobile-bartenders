// public-ts/navigation.ts
var htmlElement = document.documentElement;
var hamburgerButton = htmlElement.querySelector(".hamburger");
var navOverlayElement = htmlElement.querySelector(".nav-overlay");
window.addEventListener("resize", closeOverlayNavWithResize);
document.addEventListener("keydown", closeOverlayNavWithEscape);
hamburgerButton.addEventListener("click", navOverlayFunctionality);
var navLinksCollection = htmlElement.getElementsByClassName("nav-link");
var navLinksArray = Array.from(navLinksCollection);
var currentPath = window.location.pathname;
navLinksArray.forEach((link) => {
  const linkPath = new URL(link.href).pathname;
  if (currentPath === linkPath)
    link.classList.add("current-page");
});
function navOverlayFunctionality() {
  isNavOverlayHidden() ? openOverlayNav() : closeOverlayNav();
}
function isNavOverlayHidden() {
  return navOverlayElement.classList.contains("hidden");
}
function closeOverlayNav() {
  htmlElement.classList.remove("overlay-nav-open");
  hamburgerButton.classList.remove("open");
  navOverlayElement.classList.add("hidden");
}
function closeOverlayNavWithEscape(event) {
  if (isNavOverlayHidden() === false && event.key === "Escape")
    closeOverlayNav();
}
function closeOverlayNavWithResize() {
  if (isNavOverlayHidden() === false && window.innerWidth > 768)
    closeOverlayNav();
}
function openOverlayNav() {
  htmlElement.classList.add("overlay-nav-open");
  hamburgerButton.classList.add("open");
  navOverlayElement.classList.remove("hidden");
}

// public-ts/scroll-to-top.ts
function initScrollToTop() {
  const scrollToTopButton = document.querySelector(".scroll-to-top");
  const heroElement = document.querySelector(".hero");
  const navbar = document.querySelector(".navbar");
  if (!scrollToTopButton || !heroElement || !navbar) return;
  const navbarHeight = navbar.offsetHeight;
  scrollToTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    scrollTo({ top: 0, behavior: "smooth" });
  });
  const options = {
    root: null,
    rootMargin: `-${navbarHeight}px`,
    threshold: 0
  };
  const buttonVisibility = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) scrollToTopButton.classList.remove("hidden");
      else scrollToTopButton.classList.add("hidden");
    });
  };
  const observer = new IntersectionObserver(buttonVisibility, options);
  observer.observe(heroElement);
}
initScrollToTop();
