// import { trim, isEmail, isDate, isMobilePhone } from 'validator/lib';
import validator from 'validator';
import formFieldsDefiniton from '../utils/validation/formFieldsDefinition.js';

const validateUserInput = (req, res, next) => {
    try {
        const { body } = req;
        const formFields = { ...body }; // shallow copy
        const errorsArray = [];

        for (const [key, value] of Object.entries(formFields)) {
            const clientErrorMessageObject = formFieldsDefiniton[key];

            if (formFields.hasOwnProperty(key)) {
                const trimmedValue = validator.trim(value);
                formFields[key] = trimmedValue;
            }

            if (typeof key !== 'string' && typeof value !== 'string') {
                throw new TypeError(`${key} : ${value}\n is NOT a string`);
            }

            if (key === 'name' || key === 'inquiry') {
                if (value.length < 1) errorsArray.push(clientErrorMessageObject);
            }

            if (key === 'email') {
                if (!validator.isEmail(value)) errorsArray.push(clientErrorMessageObject);
            }

            if (key === 'phone') {
                if (!validator.isMobilePhone(value)) errorsArray.push(clientErrorMessageObject);
            }
        }

        if (errorsArray.length > 0) {
            res.status(400).send({ errors: errorsArray })
        } else {
            req.validatedInput = { ...formFields };
            next();
        }

    } catch (error) {
        console.error(error.name, error.message)
    }
}

export default validateUserInput;