// handles scrolling functionality
const scrollToTopButton = document.querySelector('.scroll-to-top');
const heroElement = document.querySelector('.hero');
const navbarHeight = document.querySelector('.navbar').offsetHeight;

// scroll to top functionality
scrollToTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    scrollTo({ top: 0, behavior: 'smooth' });
});

// show/hide scroll to top button
heroObserver();


function heroObserver() {
    const options = {
        root: null,
        rootMargin: `-${navbarHeight}px`,
        scrollMargin: "0px",
        threshold: 0
    };

    const buttonVisibility = (entries, observer) => {
        entries.forEach(entry => {
            const { isIntersecting } = entry;

            if (!isIntersecting) scrollToTopButton.classList.remove('hidden');
            else scrollToTopButton.classList.add('hidden');
        });
    };

    const observer = new IntersectionObserver(buttonVisibility, options);

    observer.observe(heroElement);
}