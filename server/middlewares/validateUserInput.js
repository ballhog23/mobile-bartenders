// validate user input before passing it to sanitzer

const validateUserInput = (req, res, next) => {
    const { body } = req;
    const formFields = structuredClone(body);

    if (formFields === null || formFields === undefined) throw new Error('You fucked something up in the POST req')

    for (const [key, value] of Object.entries(formFields)) {
        if (typeof value !== 'string') throw new Error('form field value is something other than a string')
        console.log('validating: ',typeof key, key, typeof value, value);
    }

    req.validatedOutput = { ...formFields };
    
    next();
}

export default validateUserInput;