import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import * as E from "../entities";
import { commentRepository, userRepository } from "../repositories";
import { afterEach } from "node:test";
import validate from "uuid-validate";

export const verifyCommentsId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const uuidCommentId = req.params.commentId;

	if (!validate(uuidCommentId)) throw new AppError("Invalid uuid", 400);

	const comment: E.Comment | null | undefined =
		await commentRepository.findOneBy({
			id: uuidCommentId,
		});

	if (!comment) throw new AppError("Commnet not found", 404);
	return next();
};
