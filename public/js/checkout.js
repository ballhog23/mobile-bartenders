// front-end js

// the service form
const serviceForm = document.getElementById('service-form');

// the service form fields elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const eventDateInput = document.getElementById('eventDate');
const serviceSelect = document.getElementById('service');

// add event listener to form and invoke onFormSubmit
serviceForm.addEventListener('submit', onFormSubmit);

// async function to handle for submission
async function onFormSubmit(event) {
    event.preventDefault();

    // data from form
    const data = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        eventDate: eventDateInput.value,
        service: serviceSelect.value
    }

    // make a POST request to server end-point
    const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // get url from server response and redirect user to stripe checkout
    const { url } = await res.json();
    window.location.href = url;
}

























