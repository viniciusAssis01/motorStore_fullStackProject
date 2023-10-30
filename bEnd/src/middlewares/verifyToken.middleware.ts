import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authorization: string | undefined | null = req.headers.authorization;

	if (!authorization) throw new AppError("Missing bearer token", 401);

	const token: string = authorization.split(" ")[1];

	res.locals = {
		...res.locals,
		decoded: verify(token, process.env.SECRET_KEY!),
	};

	return next();
};
