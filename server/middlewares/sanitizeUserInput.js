// sanitize contact form user input data

const sanitizeUserInput = (req, res, next) => {
    const { body } = req;
    const { name, email, phone, inquiry } = body;
    console.log('SANITIZE: ', name, email, phone, inquiry);
    req.sanitizedInput = {name: name, email: email, phone: phone, inquiry: inquiry};
    next();
};

export default sanitizeUserInput;