import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import * as E from "../entities";
import { userRepository } from "../repositories";

export const verifyUserIdExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { userId } = req.params;

	const user: E.User | null | undefined = await userRepository.findOneBy({
		id: userId,
	});

	if (!user) throw new AppError("User not found", 404);
	return next();
};
