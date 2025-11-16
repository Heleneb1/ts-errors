import { CustomError } from "../src/CustomError";

describe("CustomError", () => {

    test("crée une erreur avec message et statusCode", () => {
        const err = new CustomError("Not found", 404);

        expect(err.message).toBe("Not found");
        expect(err.statusCode).toBe(404);
        expect(typeof err.emoji).toBe("string");
        expect(err.category).toBeDefined();
    });

    test("fallback en 500 si statusCode invalide", () => {
        const err = new CustomError("Oops", "abc" as any);

        expect(err.statusCode).toBe(500);
    });

    test("extrait automatiquement depuis un objet erreur", () => {
        const err = new CustomError({ message: "Nope", statusCode: 400 });

        expect(err.message).toBe("Nope");
        expect(err.statusCode).toBe(400);
    });

    test("toJSON renvoie un objet complet", () => {
        const err = new CustomError("Bad", 400, { id: 1 });

        const json = err.toJSON();
        expect(json).toHaveProperty("emoji");
        expect(json).toHaveProperty("message", "Bad");
        expect(json).toHaveProperty("statusCode", 400);
        expect(json).toHaveProperty("details");
        expect(json).toHaveProperty("timestamp");
    });

    test("formattedMessage compact", () => {
        const msg = new CustomError("Error", 401).formattedMessage(true, false, false);
        expect(msg.includes("401")).toBe(true);
        expect(msg.includes("Error")).toBe(true);
    });

});
