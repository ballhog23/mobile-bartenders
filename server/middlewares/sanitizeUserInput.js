import validator from 'validator';

const sanitizeUserInput = (req, res, next) => {
    const { validatedInput } = req;

    for (const [key, value] of Object.entries(validatedInput)) {
        // shouldn't have to sanitize the key in this case because the user is not messing with it and
        validatedInput[key] = validator.escape(value);
    }
    console.log(validatedInput)
    req.sanitizedOutput = { ...validatedInput };

    next();
};

export default sanitizeUserInput;