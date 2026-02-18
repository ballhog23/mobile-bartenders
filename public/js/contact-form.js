const contactForm = document.getElementById('contact-form');
const formFields = contactForm.querySelectorAll('label+[name]');

contactForm.addEventListener('submit', submitHandler);
contactForm.addEventListener('blur', validateUserInput, true);

function validateUserInput(event) {
    const input = event.target;
    const id = input.id;
    const validityObject = input.validity;
    const button = contactForm.querySelector('button');
    const formFieldsDefintion = {
        name: {
            name: 'name',
            errorMessage: 'Please enter your legal name'
        },
        email: {
            name: 'email',
            errorMessage: 'Invalid email format. Use this format: example@domain.com'
        },
        phone: {
            name: 'phone',
            errorMessage: 'Invalid phone format. Only Digits. No area code. Use this format: 1231231234'
        },
        inquiry: {
            name: 'inquiry',
            errorMessage: 'Please enter a message'
        },
    };

    if (input !== button) {
        const errorMessage = formFieldsDefintion[id].errorMessage;
        input.checkValidity();

        if (validityObject.tooShort || validityObject.tooLong || validityObject.patternMismatch || validityObject.valueMissing) {
            input.setCustomValidity(errorMessage);
        } else {
            input.style.removeProperty('border-color');
            input.setCustomValidity('');
        }
    }
}

async function submitHandler(event) {
    event.preventDefault();
    const formFieldsValues = formFields.values();
    const formFieldsObject = createObject(formFieldsValues, {});
    const formErrorsElement = document.querySelector('.form-errors');
    const successMessageElement = document.querySelector('.success-message');

    try {
        const json = await sendData(formFieldsObject);
        const { errors } = json;

        if (errors) {
            formErrorsElement.style.display = "block";

            if (formErrorsElement.hasChildNodes()) {
                const currentErrors = Array.from(formErrorsElement.childNodes);
                currentErrors.forEach(element => element.remove());
            }

            formFields.forEach(element => element.style.removeProperty('border-color'));

            for (const error of Object.values(errors)) {
                const { name, errorMessage } = error;
                const element = document.createElement('p');
                const errorField = document.getElementById(name); // form field if error is present for field
                element.id = `${name}-error`;
                element.innerText = errorMessage;
                formErrorsElement.insertAdjacentElement('afterbegin', element);

                if (errorField) {
                    errorField.style.borderColor = '#9d061a';
                }
            }
        } else {
            formErrorsElement.style.display = "none";
            contactForm.style.display = "none";
            successMessageElement.style.display = "block";
            successMessageElement.firstElementChild.insertAdjacentText('beforeend', `, ${json.message}!`);
        }

    } catch (error) {
        console.error(error.name, error.message);
    }
}

async function sendData(object) {
    // const url = 'https://calebpirkle.com/contact/form-submit';
    const url = 'http://localhost:3000/contact/form-submit';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`network error`);
    }

    const json = await response.json();

    return json;
}

function createObject(formFieldsNodeList, object) {

    for (const element of formFieldsNodeList) {
        const key = element.name;
        const value = element.value.trim();
        object[key] = value;
    };

    return object;
}