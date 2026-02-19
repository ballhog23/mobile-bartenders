import './navigation';
import './scroll-to-top';
import {
    contactFormFieldsDefinition,
    type ContactFormFieldDefinition,
    FormErrorObject
} from "../shared/contact-form-definition.js";

type ContactResponse = {
    errors?: FormErrorObject[];
    message?: string;
};

const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const formFields = contactForm.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('label+[name]');

contactForm.addEventListener('submit', submitHandler);
contactForm.addEventListener('blur', validateUserInput, true);

function validateUserInput(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    const id = input.id;
    const validityObject = input.validity;
    const button = contactForm.querySelector('button');
    const formFieldsDefinition = contactFormFieldsDefinition;

    // client side validation
    if (input !== button) {
        const fieldDefinition = formFieldsDefinition[id];
        if (!fieldDefinition)
            return;

        // Run browser validity checks
        input.checkValidity();
        const validityCheck = validityObject.tooShort ||
            validityObject.tooLong ||
            validityObject.patternMismatch ||
            validityObject.valueMissing;

        const value = input.value.trim();
        const minMaxCheck = value.length < fieldDefinition.minLength || value.length > fieldDefinition.maxLength;

        if (minMaxCheck || validityCheck) {
            input.classList.add('form-error');
            input.setCustomValidity(fieldDefinition.errorMessage);

        } else {
            input.classList.remove('form-error');
            input.setCustomValidity('');
        }

        // if user tries to navigate away from form field without adding input
        // it will focus the element until they pass the browser side check, its kind of toxic to be honest
        input.reportValidity();
    }
}

async function submitHandler(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const formFieldsValues = formFields.values();
    const formFieldsObject = createObject(formFieldsValues, {});
    const formErrorsElement = document.querySelector<HTMLElement>('.form-errors')!;
    const successMessageElement = document.querySelector<HTMLElement>('.success-message')!;

    try {
        const json = await sendData(formFieldsObject);
        const { errors } = json;

        if (errors) {
            formErrorsElement.style.display = 'block';

            // check if previous error messages are present, if so remove them to insert fresh ones
            if (formErrorsElement.hasChildNodes()) {
                const currentErrors = Array.from(formErrorsElement.childNodes);
                currentErrors.forEach(element => element.remove());
            }

            // same idea as above, if error messages are stale then the border color wont update
            // to see newly passing fields vs old failing fields
            formFields.forEach(element => element.classList.remove('form-error'));

            for (const error of errors) {
                const { name, errorMessage } = error;
                const element = document.createElement('p');
                element.id = `${name}-error`;
                element.textContent = errorMessage;
                formErrorsElement.insertAdjacentElement('afterbegin', element);

                if (name === 'unexpected-key-values') {
                    formFields.forEach(field => field.classList.add('form-error'));
                } else {
                    const errorField = document.getElementById(name);
                    if (errorField) errorField.classList.add('form-error');
                }
            }
        } else {
            formErrorsElement.style.display = 'none';
            contactForm.style.display = 'none';
            successMessageElement.style.display = 'block';
            successMessageElement.firstElementChild?.insertAdjacentText('beforeend', `, ${json.message}!`);
        }

    } catch (error) {
        if (error instanceof Error)
            console.error(error.name, error.message);
    }
}

async function sendData(object: Record<string, string>): Promise<ContactResponse> {
    // const url = 'https://calebpirkle.com/contact/form-submit';
    const url = 'http://localhost:3000/contact/form-submit';
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
    };

    const response = await fetch(url, options);
    return response.json() as Promise<ContactResponse>;
}

function createObject(
    formFieldsNodeList: IterableIterator<HTMLInputElement | HTMLTextAreaElement>,
    object: Record<string, string>
): Record<string, string> {
    for (const element of formFieldsNodeList) {
        object[element.name] = element.value.trim();
    }
    return object;
}
