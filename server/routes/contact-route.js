import express from 'express';
import handlerContactFormSubmit from '../controllers/contact.js';
import validateContactForm from '../middlewares/validate-contact-form.js';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import { asyncHandler } from "../utils/helpers.js";

const contactRouter = express.Router();
contactRouter.use(validateContactForm);
contactRouter.use(sanitizeUserInput);

contactRouter.post('/form-submit', asyncHandler(handlerContactFormSubmit));

export default contactRouter;