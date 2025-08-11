export function createObject(formFieldsNodeList, object) {

    for (const element of formFieldsNodeList) {
        const key = element.name;
        const value = element.value.trim();
        object[key] = value;
    };

    return object;
}

export async function sendData(object) {
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
        console.log('send data error')
    }
}