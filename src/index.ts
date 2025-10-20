export const hello = () => "Hello🖖🏼, TS-Errors!";
export * from "./createError";
export * from "./CustomError";
export * from "./errorHelpers";
export * from "./middleware/errorMiddleware";
export * from "./helpers/helpers";

// ⚡ Auto-init config globale
import { CustomError } from "./CustomError";
CustomError.config({
    showEmoji: true,
    defaultCompact: false,
    colorize: true,
});
