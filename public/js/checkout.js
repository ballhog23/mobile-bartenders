const serviceForm = document.getElementById('service-form');
const eventDateInput = document.getElementById('eventDate');

// set min attr on datepicker to tomorrow so ppl can choose the past or today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const year = tomorrow.getFullYear().toString();
const month = `${tomorrow.getMonth() + 1}`; // fuckin js 0 bases the months. also cant jsut fuckin format todays date with a fuckin string..???
const monthFormatted = month.padStart(2, 0);
const day = tomorrow.getDate().toString().padStart(2, 0);
const dateStringFormatted = `${year}-${monthFormatted}-${day}`;
eventDateInput.setAttribute('min', dateStringFormatted);

serviceForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
    event.preventDefault();
    const formFields = serviceForm.querySelectorAll('input, select');
    const formFieldsValues = formFields.values();
    const formFieldsData = createObject(formFieldsValues, {});

    try {
        const json = await sendData(formFieldsData);

        if (!json) {
            throw new Error('there was an error awaiting the json')
        }

        // send user to stripe
        window.location.href = json.url;

    } catch (error) {
        console.error(`ERROR_NAME: ${error.name}\n MESSAGE: ${error.message}`)
    }
}

function createObject(formFieldsIterator, object) {

    for (const element of formFieldsIterator) {
        const key = element.name;
        const value = element.value.trim();
        object[key] = value;
    };

    return object;
}

async function sendData(object) {
    const url = 'http://localhost:3000/checkout/create-stripe-session';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
        redirect: 'follow'
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`response: ${response.status} || ${response.statusText}`)
    }

    const json = await response.json();

    return json;
}