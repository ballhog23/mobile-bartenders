import './navigation';
import './scroll-to-top';

interface FieldDefinition {
    name: string;
    errorMessage: string;
}

interface FormError {
    name: string;
    errorMessage: string;
}

interface ContactResponse {
    errors?: FormError[];
    message?: string;
}

const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const formFields = contactForm.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('label+[name]');

contactForm.addEventListener('submit', submitHandler);
contactForm.addEventListener('blur', validateUserInput, true);

function validateUserInput(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    const id = input.id;
    const validityObject = input.validity;
    const button = contactForm.querySelector('button');
    const formFieldsDefinition: Record<string, FieldDefinition> = {
        name: { name: 'name', errorMessage: 'Please enter your legal name' },
        email: { name: 'email', errorMessage: 'Invalid email format. Use this format: example@domain.com' },
        phone: { name: 'phone', errorMessage: 'Invalid phone format. Only Digits. No area code. Use this format: 1231231234' },
        inquiry: { name: 'inquiry', errorMessage: 'Please enter a message' },
    };

    if (input !== button) {
        const errorMessage = formFieldsDefinition[id].errorMessage;
        input.checkValidity();

        if (validityObject.tooShort || validityObject.tooLong || validityObject.patternMismatch || validityObject.valueMissing) {
            input.setCustomValidity(errorMessage);
        } else {
            input.classList.remove('form-error');
            input.setCustomValidity('');
        }
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

            for (const error of Object.values(errors)) {
                const { name, errorMessage } = error;
                const element = document.createElement('p');
                element.id = `${name}-error`;
                element.innerText = errorMessage;
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
