import { CustomError } from "../CustomError";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        err.log(); // Optionnel : log dans la console ou via logger externe
        res.status(err.statusCode || 500).json(err.toJSON());
    } else {
        res.status(500).json({
            message: "Unexpected error",
            timestamp: new Date().toISOString(),
        });
    }
};
