// handles front end form validation on top of html validation
const contactForm = document.getElementById('contact-form');


contactForm.addEventListener('submit', handleValidation);

function handleValidation(event) {
    event.preventDefault();
    const clientName = document.getElementById('name');
    const clientEmail = document.getElementById('email');
    const clientPhone = document.getElementById('phone');
    const clientMessage = document.getElementById('inquiry');
    const formErrorsElement = document.querySelector('.form-errors');
    const defaultErrorMessages = {
        name: "you forgot to enter your name",
        email: "email address should look like: example@provider.com",
        phone: "telephone number should be 10 digits, only using numbers 0-9",
        inquiry: "you forgot to enter a message",
    };

    let errorMessages = [];
    let errorObject = {};

    // remove any existing error classes on input fields
    removeErrorClasses(defaultErrorMessages);

    if (!handleEmailValidity(clientEmail.value)) {
        errorMessages.push(defaultErrorMessages.email);
        errorObject.email = defaultErrorMessages.email;
    }

    if (!handleTelValidity(clientPhone.value)) {
        errorMessages.push(defaultErrorMessages.phone);
        errorObject.phone = defaultErrorMessages.phone;
    }

    if (errorMessages.length > 0) {
        // add new error classes
        addErrorClasses(errorObject)
        // check for exisitng error messages, and update the html accordingly
        updateErrorMessages(formErrorsElement);
        formErrorsElement.insertAdjacentHTML('afterbegin', generateErrorHtml(errorMessages));
        formErrorsElement.style.display = 'block';
    } else {
        updateErrorMessages(formErrorsElement);
        formErrorsElement.style.display = 'none';
        console.log('send to backend')
    }
}

function handleEmailValidity(email) {
    const emailRegex = /^\w+\@\w+\.\w+$/igm;
    return emailRegex.test(email)
}

function handleTelValidity(tel) {
    const telRegex = /[0-9]{10}/;
    return telRegex.test(tel);
}

function handleTextInputValidity(elementValue, minLength, maxLength) {
    console.log(elementValue, minLength, maxLength);
}

function generateErrorHtml(array) {
    const generateHtmlFromArray = array.map((element) => `<span>${element}</span><br/>`);
    const html = generateHtmlFromArray.join(' ');
    return html;
}

function updateErrorMessages(element) {
    element.hasChildNodes() ? element.replaceChildren() : false;
}

function addErrorClasses(object) {
    for (const key in object) {
        document.getElementById(key).classList.add('form-error')
    }
}

function removeErrorClasses(object) {
    for (const key in object) {
        document.getElementById(key).classList.remove('form-error')
    }
}