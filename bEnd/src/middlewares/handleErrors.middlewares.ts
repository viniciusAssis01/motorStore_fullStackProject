import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { z } from "zod";

export const handleError = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
): Response => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({ message: error.message });
	}

	if (error instanceof z.ZodError) {
		return res.status(400).json(error.flatten().fieldErrors);
	}

	console.error(error);
	return res.status(500).json({ message: "Internal Server Error." });
};
