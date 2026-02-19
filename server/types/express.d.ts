// types/express.d.ts
import express from 'express';
import type { ContactFormSchema } from "../utils/zod.ts";

declare global {
	namespace Express {
		interface Request {
			validatedContactFormInput?: ContactFormSchema;
		}
	}
}
