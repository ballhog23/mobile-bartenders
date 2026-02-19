import type { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import contactFormFieldsDefinition,
{
    type ContactFormFieldDefinition

} from '../utils/contact-form-definition.js';

type FormErrorObject = Pick<ContactFormFieldDefinition, "name" | "errorMessage">;

const validateContactForm = (req: Request, res: Response, next: NextFunction): void => {
    console.log('validating contact form data...');
    const { body } = req;
    const validated: Record<string, string> = {};
    const errorsArray: Array<FormErrorObject> = [];

    // catch unexpected keys incoming first, return quick
    const unexpectedKeys = Object.keys(body).filter(k => !contactFormFieldsDefinition[k]);
    if (unexpectedKeys.length > 0) {
        errorsArray.push({
            name: 'unexpected-key-values',
            errorMessage: 'Unexpected fields submitted',
        });
        res.status(400).send({ errors: errorsArray });
        return;
    }

    // validate properly shaped incoming data
    for (const [key, config] of Object.entries(contactFormFieldsDefinition)) {
        const errorObject: FormErrorObject = {
            name: config.name,
            errorMessage: config.errorMessage,
        };
        let value: string = body[key];

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
