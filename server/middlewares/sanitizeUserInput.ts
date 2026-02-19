import type { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const sanitizeUserInput = (req: Request, _: Response, next: NextFunction): void => {
    const { validatedInput } = req;

    if (!validatedInput) {
        next();
        return;
    }

    for (const [key, value] of Object.entries(validatedInput)) {
        // shouldn't have to sanitize the key in this case
        validatedInput[key] = validator.escape(value);
    }

    req.sanitizedOutput = { ...validatedInput };

    next();
};

export default sanitizeUserInput;
