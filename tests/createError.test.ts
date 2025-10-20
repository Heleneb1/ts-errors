import { createError } from "../src/createError";

test("createError renvoie une instance de CustomError", () => {
    const err = createError("Email invalide", 400, { field: "email" });
    expect(err.message).toBe("Email invalide");
    expect(err.statusCode).toBe(400)
    expect(err.details).toEqual({ field: "email" });
    expect(err instanceof Error).toBe(true)

});

