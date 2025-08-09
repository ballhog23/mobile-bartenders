// the service form
const serviceForm = document.getElementById('service-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const eventDateInput = document.getElementById('eventDate');
const serviceSelect = document.getElementById('service');

// add event listener to form and invoke onFormSubmit
serviceForm.addEventListener('submit', onFormSubmit);

// async function to handle for submission
async function onFormSubmit(event) {
}

// set min attr on datepicker to today
const today = new Date();
const year = today.getFullYear().toString();
const month = `${today.getMonth() + 1}`; // fuckin js 0 bases the months. also cant jsut fuckin format todays date with a fuckin string..???
const monthFormatted = month.padStart(2, 0);
const day = today.getDate().toString().padStart(2, 0);
const dateStringFormatted = `${year}-${monthFormatted}-${day}`;

eventDateInput.setAttribute('min', dateStringFormatted);