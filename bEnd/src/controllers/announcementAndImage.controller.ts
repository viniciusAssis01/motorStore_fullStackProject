import { Request, Response } from "express";
import * as I from "../interfaces";
import * as S from "../services";

export const createAnnouncementController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: string = res.locals.decoded.sub;
	const announcement: I.TImageAndAnouncementResponse =
		await S.createAnnouncementAndImageService(userId, req.body);
	return res.status(201).json(announcement);
};

export const readAllAnnouncementController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const readAll: I.TImageAndAnouncementReadAll =
		await S.readAllAnnouncementService();
	return res.status(200).json(readAll);
};

export const readAnnouncementIdController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const announcementId = req.params.announcementId;
	const announcement /* : I.TImageAndAnouncementResponse */ =
		await S.readAnnouncementIdService(announcementId);

	return res.status(200).json(announcement);
};

export const userAdsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: string = req.params.userId;
	const userAds: I.TUserReadIdResponse = await S.userAds(userId);
	return res.status(200).json(userAds);
};

export const updateAnnouncementController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const announcementId: string = req.params.announcementId;
	const userId: string = res.locals.decoded.sub;
	const updateAnnouncement = await S.updateAnnouncementAndImageService(
		announcementId,
		userId,
		req.body
	);
	return res.status(200).json(updateAnnouncement);
};

export const deleteAnnouncementController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const announcementId: string = req.params.announcementId;
	const userId: string = res.locals.decoded.sub;
	await S.deleteAnnouncementService(announcementId, userId);
	return res.status(204).json();
};
