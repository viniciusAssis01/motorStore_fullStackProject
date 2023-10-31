import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { User } from "../entities";
import * as repository from "../repositories";

export const verifyEmailUserExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const email: string = req.body.email;
	if (!email) return next();

	const foundEmail: User | null = await repository.userRepository.findOneBy({
		email: email,
	});

	if (foundEmail) throw new AppError("Email already exists", 409);

	return next();
};
