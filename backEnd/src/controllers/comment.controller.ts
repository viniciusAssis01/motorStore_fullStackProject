import { Request, Response } from "express";
import * as I from "../interfaces";
import * as S from "../services";

export const createCommentController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const announcementId: string = req.params.announcementId;
	const userId: string = res.locals.decoded.sub;
	const createComment: I.TCommentResponse = await S.createCommentService(
		announcementId,
		userId,
		req.body
	);

	return res.status(201).json(createComment);
};

export const readAllCommentsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const announcement = req.params.announcementId;
	console.log(announcement);
	const comments: I.TCommentReadAll = await S.readAllCommentsService(
		announcement
	);
	return res.status(200).json(comments);
};

export const updateCommentController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const commentId = req.params.commentId;
	const userId = res.locals.decoded.sub;

	const updateComment: I.TCommentResponse = await S.updateComment(
		commentId,
		userId,
		req.body
	);
	return res.status(200).json(updateComment);
};

export const deleteCommentController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const commentId = req.params.commentId;
	const user = res.locals.decoded.sub;

	await S.deleteComment(commentId, user);
	return res.status(204).json();
};
