import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import * as E from "../entities";
import { userRepository } from "../repositories";
import validate from "uuid-validate";

export const verifyUserIdExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const uuidUserId = req.params.userId;

	if (!validate(uuidUserId)) throw new AppError("Invalid uuid", 400);

	const user: E.User | null | undefined = await userRepository.findOneBy({
		id: uuidUserId,
	});

	if (!user) throw new AppError("User not found", 404);
	return next();
};
