import express from 'express';
import handlerContactFormSubmit from '../controllers/contact.js';
import validateUserInput from '../middlewares/validateUserInput.js';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import { asyncHandler } from "../utils/helpers.js";

const contactRouter = express.Router();
contactRouter.use(validateUserInput);
contactRouter.use(sanitizeUserInput);
contactRouter.post('/form-submit', asyncHandler(handlerContactFormSubmit));

export default contactRouter;