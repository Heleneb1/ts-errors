import { CustomError } from "./CustomError";


export const createError = (
    message: string,
    code?: number,
    details?: Record<string, unknown>
): CustomError => {
    return new CustomError(message, code, details);
};
