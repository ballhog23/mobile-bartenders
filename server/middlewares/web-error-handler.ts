import type { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

interface AppError extends Error {
    statusCode?: number;
}

export function handlerWebError(err: AppError, req: Request, res: Response, next: NextFunction): void {
    const statusCode = err.statusCode ?? 500;
    const message =
        statusCode >= 500 ? 'There was an issue on our end.' : err.message;

    if (statusCode >= 500)
        console.error(err.message);
    console.log(err);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    res.status(statusCode).sendFile(join(__dirname, '../../public', '404.html'));
}
