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

// public-ts/checkout.ts
var serviceForm = document.getElementById("service-form");
var eventDateInput = document.getElementById("eventDate");
var today = /* @__PURE__ */ new Date();
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
var year = tomorrow.getFullYear().toString();
var month = `${tomorrow.getMonth() + 1}`;
var monthFormatted = month.padStart(2, "0");
var day = tomorrow.getDate().toString().padStart(2, "0");
var dateStringFormatted = `${year}-${monthFormatted}-${day}`;
eventDateInput.setAttribute("min", dateStringFormatted);
serviceForm.addEventListener("submit", onFormSubmit);
async function onFormSubmit(event) {
  event.preventDefault();
  const formFields = serviceForm.querySelectorAll("input, select");
  const formFieldsValues = formFields.values();
  const formFieldsData = createObject(formFieldsValues, {});
  try {
    const res = await sendData(formFieldsData);
    window.location.href = res.url;
  } catch (error) {
    if (error instanceof Error)
      console.error(`ERROR_NAME: ${error.name}
 MESSAGE: ${error.message}`);
  }
}
function createObject(formFieldsIterator, object) {
  for (const element of formFieldsIterator) {
    object[element.name] = element.value.trim();
  }
  return object;
}
async function sendData(object) {
  const url = "http://localhost:3000/checkout/create-stripe-session";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("error establishing stripe session");
  }
  return response.json();
}
