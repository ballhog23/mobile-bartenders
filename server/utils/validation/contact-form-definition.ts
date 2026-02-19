interface FieldDefinition {
    name: string;
    errorMessage: string;
    minLength: number;
    maxLength: number;
}

const contactFormFieldsDefinition: Record<string, FieldDefinition> = {
    name: {
        name: 'name',
        errorMessage: 'Please enter your name. Must be between 2 and 50 characters.',
        minLength: 2,
        maxLength: 50,
    },
    email: {
        name: 'email',
        errorMessage: 'Invalid email format. Use this format: example@domain.com. Must be between 5 and 50 characters.',
        minLength: 5,
        maxLength: 50,
    },
    phone: {
        name: 'phone',
        errorMessage: 'Invalid phone format. Only Digits. No area code. Use this format: 1231231234. Must be 10 characters.',
        minLength: 10,
        maxLength: 10,
    },
    inquiry: {
        name: 'inquiry',
        errorMessage: 'Please enter a message. Must be between 10 and 500 characters.',
        minLength: 10,
        maxLength: 500,
    },
};

export default contactFormFieldsDefinition;
