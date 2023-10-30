import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const isUserOrOwner = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { sub } = res.locals.decoded;
	const { userId } = req.params;

	if (sub !== userId) {
		throw new AppError("Insufficient permission", 403);
	}

	return next();
};
