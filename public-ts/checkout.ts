import './navigation';
import './scroll-to-top';

interface CheckoutResponse {
    url: string;
}

const serviceForm = document.getElementById('service-form') as HTMLFormElement;
const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const year = tomorrow.getFullYear().toString();
const month = `${tomorrow.getMonth() + 1}`;
const monthFormatted = month.padStart(2, '0');
const day = tomorrow.getDate().toString().padStart(2, '0');
const dateStringFormatted = `${year}-${monthFormatted}-${day}`;
eventDateInput.setAttribute('min', dateStringFormatted);

serviceForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const formFields = serviceForm.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select');
    const formFieldsValues = formFields.values();
    const formFieldsData = createObject(formFieldsValues, {});

    try {
        const res = await sendData(formFieldsData);
        window.location.href = res.url;
    } catch (error) {
        if (error instanceof Error)
            console.error(`ERROR_NAME: ${error.name}\n MESSAGE: ${error.message}`);
    }
}

function createObject(
    formFieldsIterator: IterableIterator<HTMLInputElement | HTMLSelectElement>,
    object: Record<string, string>
): Record<string, string> {
    for (const element of formFieldsIterator) {
        object[element.name] = element.value.trim();
    }
    return object;
}

async function sendData(object: Record<string, string>): Promise<CheckoutResponse> {
    const url = 'http://localhost:3000/checkout/create-stripe-session';
    // const url = 'https://calebpirkle.com/checkout/create-stripe-session';
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error('error establishing stripe session');
    }

    return response.json() as Promise<CheckoutResponse>;
}
