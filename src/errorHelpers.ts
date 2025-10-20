import { CustomError } from "./CustomError";

// Mapping : code => emoji + default message
export const errorMap: Record<number, { defaultMsg: string; emoji: string; category?: string }> = {
    400: { defaultMsg: "Invalid request", emoji: '❗', category: 'Client Error' },
    401: { defaultMsg: "Unauthorized", emoji: '⛔', category: 'Client Error' },
    403: { defaultMsg: "Forbidden", emoji: '⛔', category: 'Client Error' },
    404: { defaultMsg: "Resource not found", emoji: '⁉️', category: 'Client Error' },
    409: { defaultMsg: "Conflict", emoji: '⚔️', category: 'Client Error' },
    422: { defaultMsg: "Unprocessable entity", emoji: '❌', category: 'Client Error' },
    429: { defaultMsg: "Too many requests", emoji: '⏸️', category: 'Client Error' },
    500: { defaultMsg: "Internal server error", emoji: '⚙️', category: 'Server Error' },
    503: { defaultMsg: "Service unavailable", emoji: '⚙️', category: 'Server Error' },
    504: { defaultMsg: "Gateway timeout", emoji: '⏱️', category: 'Server Error' },
};

// Génère dynamiquement les fonctions d’erreurs
export const createErrorFunction = (code: number) => {
    const { defaultMsg } = errorMap[code] || { defaultMsg: "Error" };
    return (message?: string, details: Record<string, unknown> = {}) => {
        return new CustomError(message ?? defaultMsg, code, details);
    };
};

// Export des erreurs spécifiques
export const NotFoundError = createErrorFunction(404);
export const UnauthorizedError = createErrorFunction(401);
export const BadRequestError = createErrorFunction(400);
export const ForbiddenError = createErrorFunction(403);
export const UnprocessableEntityError = createErrorFunction(422);
export const TooManyRequestsError = createErrorFunction(429);
export const InternalServerError = createErrorFunction(500);
export const ConflictError = createErrorFunction(409);
export const ServiceUnavailableError = createErrorFunction(503);
export const GatewayTimeoutError = createErrorFunction(504);
