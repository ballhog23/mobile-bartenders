const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitHandler);

async function submitHandler(event) {
    event.preventDefault();
    const formFields = contactForm.querySelectorAll('label+[name]');
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
                    errorField.style.borderColor = '#9d061a'
                }
            }
        } else {
            formErrorsElement.style.display = "none";
            contactForm.style.display = "none";
            successMessageElement.style.display = "block";
            successMessageElement.firstElementChild.insertAdjacentText('beforeend', `, ${json.message}!`)
        }

    } catch (error) {
        console.error(error.name, error.message)
    }
}

function createObject(formFieldsNodeList, object) {

    for (const element of formFieldsNodeList) {
        const key = element.name;
        const value = element.value.trim();
        object[key] = value;
    };

    return object;
}

async function sendData(object) {
    const url = 'http://localhost:3000/contact/form-submit';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        // throw new Error(`response: ${response.status} || ${response.statusText}`)
    }

    const json = await response.json();

    return json;
}