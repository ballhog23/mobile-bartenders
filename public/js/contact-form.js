// handles contact form validation on top of html validation
// gets form data ready to send to backend
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', handleValidation);

async function handleValidation(event) {
    event.preventDefault();
    const clientName = document.getElementById('name');
    const clientEmail = document.getElementById('email');
    const clientPhone = document.getElementById('phone');
    const clientInquiry = document.getElementById('inquiry');
    const formErrorsElement = document.querySelector('.form-errors');
    const defaultErrorMessages = {
        name: "you forgot to enter your name",
        email: "email address should look like: example@provider.com",
        phone: "telephone number should be 10 digits, only using numbers 0-9",
        inquiry: "you forgot to enter a message",
    };
    let errorMessages = [];
    let errorObject = {};

    try {
        removeErrorClasses(defaultErrorMessages);

        if (!handleEmailValidity(clientEmail.value.trim())) {
            errorMessages.push(defaultErrorMessages.email);
            errorObject.email = defaultErrorMessages.email;
        }

        if (!handleTelValidity(clientPhone.value.trim())) {
            errorMessages.push(defaultErrorMessages.phone);
            errorObject.phone = defaultErrorMessages.phone;
        }

        if (!handleTextInputValidity(clientName.value.trim(), 2, 50)) {
            errorMessages.push(defaultErrorMessages.name);
            errorObject.name = defaultErrorMessages.name
        }

        if (!handleTextInputValidity(clientInquiry.value.trim(), 10, 500)) {
            errorMessages.push(defaultErrorMessages.inquiry);
            errorObject.inquiry = defaultErrorMessages.inquiry;
        }

        if (errorMessages.length > 0) {
            addErrorClasses(errorObject)
            updateErrorMessages(formErrorsElement);
            formErrorsElement.insertAdjacentHTML('afterbegin', generateErrorHtml(errorMessages));
            formErrorsElement.style.display = 'block';
        } else {
            updateErrorMessages(formErrorsElement);
            formErrorsElement.style.display = 'none';
            const data = createEmailObject(clientName.value, clientEmail.value, clientPhone.value, clientInquiry.value);
            const response = await sendData(data);
            
            if (!response) {
                console.log('something went wrong')
            }

            console.log(response)
        }
    } catch (error) {
        console.log(error)
    }
}

function handleEmailValidity(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gmi;
    return emailRegex.test(email)
}

function handleTelValidity(tel) {
    const telRegex = /[0-9]{10}/g;
    return telRegex.test(tel);
}

function handleTextInputValidity(elementValue, minLength, maxLength) {
    const elementLength = elementValue.length
    return elementLength >= minLength && elementLength <= maxLength;
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

function createEmailObject(clientName, clientEmail, clientPhone, clientInquiry) {
    return {
        name: clientName.trim(),
        email: clientEmail.trim(),
        phone: clientPhone.trim(),
        inquiry: clientInquiry.trim(),
    }
}

async function sendData(object) {
    const url = 'http://localhost:3000/contact/form-submit';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`response status: ${response.status}`)
        }

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error.message, 'well shit')
    }
}