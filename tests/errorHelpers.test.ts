import {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
    UnprocessableEntityError,
    TooManyRequestsError,
    InternalServerError,
    ConflictError,
    ServiceUnavailableError,
    GatewayTimeoutError,
} from "../src/errorHelpers";

const cases = [
    { fn: NotFoundError, name: "NotFoundError", statusCode: 404, emoji: "⁉️" },
    { fn: UnauthorizedError, name: "UnauthorizedError", statusCode: 401, emoji: "⛔" },
    { fn: BadRequestError, name: "BadRequestError", statusCode: 400, emoji: "❗" },
    { fn: ForbiddenError, name: "ForbiddenError", statusCode: 403, emoji: "⛔" },
    { fn: UnprocessableEntityError, name: "UnprocessableEntityError", statusCode: 422, emoji: "❌" },
    { fn: TooManyRequestsError, name: "TooManyRequestsError", statusCode: 429, emoji: "⏸️" },
    { fn: InternalServerError, name: "InternalServerError", statusCode: 500, emoji: "⚙️" },
    { fn: ConflictError, name: "ConflictError", statusCode: 409, emoji: "⚔️" },
    { fn: ServiceUnavailableError, name: "ServiceUnavailableError", statusCode: 503, emoji: "⚙️" },
    { fn: GatewayTimeoutError, name: "GatewayTimeoutError", statusCode: 504, emoji: "⏱️" },
];

cases.forEach(({ fn, name, statusCode, emoji }) => {
    test(`${name} creates a CustomError with statusCode ${statusCode}`, () => {
        const err = fn("Test message", { id: 1 });

        expect(err.message).toBe(`Test message`);
        expect(err.emoji).toBe(emoji);
        expect(err.statusCode).toBe(statusCode);
        expect(err.details).toEqual({ id: 1 });
        expect(err instanceof Error).toBe(true);
        expect(err.stack).toBeDefined();
    });

});
//Test sans détails
test("NotFoundError sans details", () => {
    const err = NotFoundError("Message sans details");
    expect(err.message).toBe("Message sans details");
    expect(err.emoji).toBe("⁉️");
    expect(err.statusCode).toBe(404);
    expect(err.details).toStrictEqual({});
    expect(err instanceof Error).toBe(true);
});

