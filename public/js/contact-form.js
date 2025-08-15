const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitHandler);

async function submitHandler(event) {
    event.preventDefault();
    const formFields = contactForm.querySelectorAll('label+[name]');
    const formFieldsValues = formFields.values();
    const formFieldsObject = createObject(formFieldsValues, {});
    const successMessageElement = document.querySelector('.success-message');

    try {
        const json = await sendData(formFieldsObject);

        if (!json) {
            window.alert('something has gone wrong, please refresh the page and try again.')
        } else {
            contactForm.style.display = "none";
            successMessageElement.style.display = "block";
            successMessageElement.firstElementChild.insertAdjacentText('beforeend', `, ${json.message}!`)
        }

    } catch (error) {
        console.error(error.message)
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
    const url = 'https://localhost:3000/contact/form-submit';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`response: ${response.status} || ${response.statusText}`)
    }

    const json = await response.json();

    return json;
}