// houses schemas for validation
import * as z from "zod";
import { contactFormFieldsDefinition } from "../../shared/contact-form-definition.js";

const { name, email, phone, inquiry } = contactFormFieldsDefinition;

const nameError = { error: name.errorMessage };
const nameInput =
    z.string(nameError)
        .trim()
        .refine(val =>
            val.length >= name.minLength && val.length <= name.maxLength,
            nameError
        );

// zod will throw as many errors it encounters with validation which is great
// but I just want one error message per validation check so refine is the play
// we could break them into separate refine functions which may be more readable and add abort: true
const emailError = { error: email.errorMessage };
const emailInput =
    z.string()
        .trim()
        .refine(val =>
            val.length >= email.minLength && val.length <= email.maxLength && val.match(z.regexes.html5Email),
            emailError
        );
// const emailInput =
//     z.email({ pattern: z.regexes.html5Email, ...emailError })
//         .min(email.minLength, emailError)
//         .max(email.maxLength, emailError)
//         .trim();

if (!phone.regex)
    throw new Error("Phone regex missing from contactFormFieldsDefinition");
const phoneError = { error: phone.errorMessage };
const phoneInput =
    z.string()
        .trim()
        .regex(phone.regex, phoneError);

const inquiryError = { error: inquiry.errorMessage };
const inquiryInput =
    z.string()
        .trim()
        .refine(val =>
            val.length >= inquiry.minLength && val.length <= inquiry.maxLength,
            inquiryError
        );


export const contactFormSchema = z.strictObject({
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    inquiry: inquiryInput
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;