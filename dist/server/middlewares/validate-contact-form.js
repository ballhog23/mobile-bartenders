import { contactFormSchema } from "../utils/zod.js";
const validateContactForm = (req, res, next) => {
    const { body } = req;
    const validatedInput = contactFormSchema.safeParse(body);
    if (validatedInput.success) {
        req.validatedContactFormInput = validatedInput.data;
        return next();
    }
    const errors = validatedInput.error.issues.map(errorObj => {
        const [name] = errorObj.path; // key of object maps to input element on frontend
        const errorMessage = errorObj.message;
        return {
            name,
            errorMessage
        };
    });
    return res.status(400).send({ errors });
};
export default validateContactForm;
