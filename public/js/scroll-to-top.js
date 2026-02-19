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
export {
  initScrollToTop
};
