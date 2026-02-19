declare global {
    namespace Express {
        interface Request {
            validatedInput?: Record<string, string>;
            sanitizedOutput?: Record<string, string>;
        }
    }
}

export {};
