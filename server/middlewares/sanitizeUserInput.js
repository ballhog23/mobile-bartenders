// sanitize contact form user input data

const sanitizeUserInput = (req, res, next) => {
    
    const { body } = req;
    const formFields = structuredClone(body);
    const formFieldsIterator = Object.entries(formFields);
    
    for (const [key, value] of formFieldsIterator) {
        console.log('SANITIZIZING: ', key);
    }

    req.sanitizedInput = {...formFields};

    next();
};

export default sanitizeUserInput;