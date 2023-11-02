import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import * as E from "../entities";
import { anouncementRepository } from "../repositories";
import validate from "uuid-validate";

export const verifyAnouncementIdExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const uuidAnouncementId = req.params.announcementId;

	if (!validate(uuidAnouncementId)) throw new AppError("Invalid uuid", 400);

	const anouncement: E.Anouncement | null | undefined =
		await anouncementRepository.findOneBy({
			id: uuidAnouncementId,
		});

	if (!anouncement) throw new AppError("Announcement not found", 404);

	return next();
};
