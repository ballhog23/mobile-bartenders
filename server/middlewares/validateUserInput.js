// import { trim, isEmail, isDate, isMobilePhone } from 'validator/lib';
import validator from 'validator';
import formFieldsDefiniton from '../utils/validation/formFieldsDefinition.js';

const validateUserInput = (req, res, next) => {
    try {
        const { body } = req;
        const formFields = structuredClone(body);
        const errorsArray = [];

        if (formFields === null || formFields === undefined) {
            // throw new Error('The formFields object is NULL or UNDEFINED');
            errorsArray.push({errorMessage: 'Please enter a value for all fields'})
        }

        for (let [key, value] of Object.entries(formFields)) {
            key = validator.trim(key);
            value = validator.trim(value);
            
            const clientErrorMessageObject = formFieldsDefiniton[key];
            // const typeErrorMessage = `${key} : ${value}\n is NOT a valid`;

            if (typeof key !== 'string' && typeof value !== 'string') {
                errorsArray.push({name: 'empty', errorMessage: 'Please enter values that are of type string'});
                // throw new TypeError(`${typeErrorMessage} string`);
            }

            if (key === 'name' || key === 'inquiry') {
                if (value.length < 1) {
                    errorsArray.push(clientErrorMessageObject);
                    // throw new Error(`${typeErrorMessage} length greater than 1`)
                }
            }

            if (key === 'email') {
                if (!validator.isEmail(value)) {
                   errorsArray.push(clientErrorMessageObject);
                    // throw new Error(`${typeErrorMessage} email`);
                }
            }

            if (key === 'phone') {
                if (!validator.isMobilePhone(value)) {
                    errorsArray.push(clientErrorMessageObject);
                    // throw new Error(`${typeErrorMessage} phone number`);
                }
            }
        }

        if (errorsArray.length > 0) {
            res.status(400).send({ errors: errorsArray })
            throw new Error(`FORM FIELDS ERROR: ${errorsArray}`);
        }

        req.validatedOutput = { ...formFields };

    } catch (error) {
        console.error(error.name, error.message)
    }

    next();
}

export default validateUserInput;