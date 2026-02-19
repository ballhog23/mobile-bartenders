import validator from 'validator';
import contactFormFieldsDefinition from '../utils/validation/contact-form-definition.js';
const validateContactForm = (req, res, next) => {
    console.log('validating contact form data...');
    const { body } = req;
    const validated = {};
    const errorsArray = [];
    const unexpectedKeys = Object.keys(body).filter(k => !contactFormFieldsDefinition[k]);
    if (unexpectedKeys.length > 0) {
        errorsArray.push({
            name: 'unexpected-key-values',
            errorMessage: 'Unexpected fields submitted',
        });
        res.status(400).send({ errors: errorsArray });
        return;
    }
    for (const [key, config] of Object.entries(contactFormFieldsDefinition)) {
        const errorObject = {
            name: config.name,
            errorMessage: config.errorMessage,
        };
        let value = body[key];
        if (!value || typeof value !== 'string' || typeof key !== 'string') {
            errorsArray.push(errorObject);
            continue;
        }
        value = validator.trim(value);
        if (value.length < config.minLength || value.length > config.maxLength)
            errorsArray.push(errorObject);
        if (key === 'email' && !validator.isEmail(value))
            errorsArray.push(errorObject);
        if (key === 'phone' && !validator.isMobilePhone(value))
            errorsArray.push(errorObject);
        validated[key] = value;
    }
    if (errorsArray.length > 0) {
        console.log('did not pass validation, returning 400 to client');
        console.log(errorsArray);
        res.status(400).send({ errors: errorsArray });
        return;
    }
    console.log('passed validation, moving to sanitization middleware');
    req.validatedInput = validated;
    next();
};
export default validateContactForm;
