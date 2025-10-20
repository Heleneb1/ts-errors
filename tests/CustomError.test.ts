import { CustomError } from "../src/CustomError";

test("CustomError fonctionne avec message, code et détails", () => {
    const err = new CustomError("Email invalide", 400, { field: "email" });

    expect(err.message).toBe("Email invalide");
    expect(err.statusCode).toBe(400);
    expect(err.details).toEqual({ field: "email" });
    expect(err instanceof Error).toBe(true); // vérifie que c'est bien une Error
});
