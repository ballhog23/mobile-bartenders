export type ContactFormFieldDefinition = {
    name: string;
    errorMessage: string;
    minLength: number;
    maxLength: number;
    regex: RegExp | null;
};

export type FormErrorObject = Pick<ContactFormFieldDefinition, "name" | "errorMessage">;

export const contactFormFieldsDefinition: Record<string, ContactFormFieldDefinition> = {
    name: {
        name: 'name',
        errorMessage: 'Please enter your name, must be between 2 and 50 characters',
        minLength: 2,
        maxLength: 50,
        regex: null
    },
    email: {
        name: 'email',
        errorMessage: 'Invalid email format. Use format: example@domain.com',
        minLength: 5,
        maxLength: 50,
        regex: null
    },
    phone: {
        name: 'phone',
        errorMessage: 'Invalid phone format. Use format: 1231231234',
        minLength: 10,
        maxLength: 10,
        regex: /\d{10}/
    },
    inquiry: {
        name: 'inquiry',
        errorMessage: 'Please enter a message between 10 and 500 characters long',
        minLength: 10,
        maxLength: 500,
        regex: null
    },
};