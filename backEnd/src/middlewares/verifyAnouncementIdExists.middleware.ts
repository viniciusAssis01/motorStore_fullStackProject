import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import * as E from "../entities";
import { anouncementRepository } from "../repositories";

export const verifyAnouncementIdExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const anouncementId = req.params.announcementId;

	const anouncement: E.Anouncement | null | undefined =
		await anouncementRepository.findOneBy({
			id: anouncementId,
		});

	if (!anouncement) throw new AppError("anouncement not found", 404);

	return next();
};
