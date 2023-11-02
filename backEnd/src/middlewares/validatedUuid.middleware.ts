import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const validateUuid = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const uuidParam = req.params.userId;

	const uuidValidate = require("uuid-validate");

	if (!uuidValidate(uuidParam)) throw new AppError("Invalid uuid", 400);

	return next();
};
