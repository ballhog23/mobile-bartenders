// email logic for aws ses
import { ContactFormSchema } from "../utils/zod.js";

const sendEmail = async (validatedContactFormInput: ContactFormSchema): Promise<void> => {
    console.log('email logic');
};

export default sendEmail;
