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

// shared/contact-form-definition.ts
var contactFormFieldsDefinition = {
  name: {
    name: "name",
    errorMessage: "Please enter your name, must be between 2 and 50 characters",
    minLength: 2,
    maxLength: 50,
    regex: null
  },
  email: {
    name: "email",
    errorMessage: "Invalid email format. Use format: example@domain.com",
    minLength: 5,
    maxLength: 50,
    regex: null
  },
  phone: {
    name: "phone",
    errorMessage: "Invalid phone format. Use format: 1231231234",
    minLength: 10,
    maxLength: 10,
    regex: /\d{10}/
  },
  inquiry: {
    name: "inquiry",
    errorMessage: "Please enter a message between 10 and 500 characters long",
    minLength: 10,
    maxLength: 500,
    regex: null
  }
};

// public-ts/contact-form.ts
var contactForm = document.getElementById("contact-form");
var formFields = contactForm.querySelectorAll("label+[name]");
contactForm.addEventListener("submit", submitHandler);
contactForm.addEventListener("blur", validateUserInput, true);
function validateUserInput(event) {
  const input = event.target;
  const id = input.id;
  const validityObject = input.validity;
  const button = contactForm.querySelector("button");
  const formFieldsDefinition = contactFormFieldsDefinition;
  if (input !== button) {
    const fieldDefinition = formFieldsDefinition[id];
    if (!fieldDefinition)
      return;
    input.checkValidity();
    const validityCheck = validityObject.tooShort || validityObject.tooLong || validityObject.patternMismatch || validityObject.valueMissing;
    const value = input.value.trim();
    const minMaxCheck = value.length < fieldDefinition.minLength || value.length > fieldDefinition.maxLength;
    if (minMaxCheck || validityCheck) {
      input.classList.add("form-error");
      input.setCustomValidity(fieldDefinition.errorMessage);
    } else {
      input.classList.remove("form-error");
      input.setCustomValidity("");
    }
    input.reportValidity();
  }
}
async function submitHandler(event) {
  event.preventDefault();
  const formFieldsValues = formFields.values();
  const formFieldsObject = createObject(formFieldsValues, {});
  const formErrorsElement = document.querySelector(".form-errors");
  const successMessageElement = document.querySelector(".success-message");
  try {
    const json = await sendData(formFieldsObject);
    const { errors } = json;
    if (errors) {
      formErrorsElement.style.display = "block";
      if (formErrorsElement.hasChildNodes()) {
        const currentErrors = Array.from(formErrorsElement.childNodes);
        currentErrors.forEach((element) => element.remove());
      }
      formFields.forEach((element) => element.classList.remove("form-error"));
      for (const error of errors) {
        const { name, errorMessage } = error;
        const element = document.createElement("p");
        element.id = `${name}-error`;
        element.textContent = errorMessage;
        formErrorsElement.insertAdjacentElement("afterbegin", element);
        if (name === "unexpected-key-values") {
          formFields.forEach((field) => field.classList.add("form-error"));
        } else {
          const errorField = document.getElementById(name);
          if (errorField) errorField.classList.add("form-error");
        }
      }
    } else {
      formErrorsElement.style.display = "none";
      contactForm.style.display = "none";
      successMessageElement.style.display = "block";
      successMessageElement.firstElementChild?.insertAdjacentText("beforeend", `, ${json.message}!`);
    }
  } catch (error) {
    if (error instanceof Error)
      console.error(error.name, error.message);
  }
}
async function sendData(object) {
  const url = "http://localhost:3000/contact/form-submit";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  return response.json();
}
function createObject(formFieldsNodeList, object) {
  for (const element of formFieldsNodeList) {
    object[element.name] = element.value.trim();
  }
  return object;
}
