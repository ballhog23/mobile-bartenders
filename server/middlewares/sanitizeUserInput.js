// sanitize contact form user input data

const sanitizeUserInput = (req, res, next) => {
    const validatedOutput = req.validatedOutput;

    for (const [key, value] of Object.entries(validatedOutput)) {
        console.log('SANITIZIZING: ', key);
    }

    req.sanitizedOutput = { ...validatedOutput };

    next();
};

export default sanitizeUserInput;