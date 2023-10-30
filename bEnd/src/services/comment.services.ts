import * as S from "../schemas";
import * as I from "../interfaces";
import * as E from "../entities";
import {
	anouncementRepository,
	commentRepository,
	userRepository,
} from "../repositories";
import { AppError } from "../error";

export const createCommentService = async (
	announcementId: string,
	userId: string,
	reqBody: I.TCommentRequest
): Promise<I.TCommentResponse> => {
	const foundUser = await userRepository.findOneBy({
		id: userId,
	});
	if (!foundUser) throw new AppError("User not found", 404);

	const foundAnnouncement = await anouncementRepository.findOneBy({
		id: announcementId,
	});
	if (!foundAnnouncement) throw new AppError("Announcement not found", 404);

	const commentCreate: E.Comment = commentRepository.create({
		...reqBody,
		user: foundUser,
		anouncement: foundAnnouncement,
	});
	await commentRepository.save(commentCreate);

	return S.commentSchemaResponse.parse(commentCreate);
};

export const readAllCommentsService = async (
	anouncementId: string
): Promise<I.TCommentReadAll> => {
	const announcement = await anouncementRepository.findOne({
		where: { id: anouncementId },
		relations: { comments: { user: { address: true } } },
	});
	return S.comentsreadAllSchema.parse(announcement!.comments);
};
export const updateComment = async (
	commentId: string,
	userId: string,
	reqBody: I.TCommentUpdateRequestDep
): Promise<I.TCommentResponse> => {
	const foundcoment = await commentRepository.findOneBy({
		id: commentId,
	});
	if (!foundcoment) throw new AppError("Comment not found", 404);

	const foundUser = await userRepository.findOneBy({
		comments: { id: commentId },
	});
	if (!foundUser) throw new AppError("User not found", 404);

	if (foundUser.id !== userId)
		throw new AppError("This comment is not yours", 404);

	if (!reqBody.comment) throw new AppError("Missing some fields", 400);

	foundcoment.comment = reqBody.comment;

	await commentRepository.save(foundcoment);
	return S.commentSchemaResponse.parse(foundcoment);
};

export const deleteComment = async (
	commentId: string,
	userId: string
): Promise<void> => {
	const foundComment = await commentRepository.findOneBy({
		id: commentId,
	});
	if (!foundComment) throw new AppError("Comment not found", 404);

	const announcement = await anouncementRepository.findOne({
		where: { comments: { id: commentId } },
		relations: { user: true },
	});

	const comment: E.Comment | null = await commentRepository.findOne({
		where: { id: commentId },
		relations: { user: true },
	});
	if (comment!.user.id !== userId && announcement!.user.id !== userId)
		throw new AppError("Insufficient permission", 403);

	await commentRepository.delete(commentId);
};
