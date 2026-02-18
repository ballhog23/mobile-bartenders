const contactRequested = (req, _, next) => {
    console.log('contact route requested');

    return next();
};

export default contactRequested;