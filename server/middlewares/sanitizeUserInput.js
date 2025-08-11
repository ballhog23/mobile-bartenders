// sanitize contact form user input data

const sanitizeUserInput = (req, res, next) => {
    const { body } = req;
    // const bodyObject = structuredClone(body);
    const { name, email, phone, inquiry } = body;
    req.sanitizedInput = { name: name, email: email, phone: phone, inquiry: inquiry };

    // for (let [property, value] of Object.entries(bodyObject)) {
    //     console.log(value)
    //     value = '?'
    // }

    console.log('SANITIZE: ');
    next();
};

export default sanitizeUserInput;