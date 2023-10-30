import { Request, Response } from "express";
import * as I from "../interfaces";
import * as S from "../services";

export const createUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const user: I.TUserCreateResponse = await S.createUserService(req.body);
	return res.status(201).json(user);
};

export const readUserIdController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = req.params.userId;
	const user: I.TUserReadIdResponse = await S.readUserIdService(userId);
	return res.status(200).json(user);
};

export const updateUserProfileController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = res.locals.decoded.sub;

	const updateProfile = await S.updateUserProfileService(userId, req.body);
	return res.status(200).json(updateProfile);
};
export const updateUserAddressController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = res.locals.decoded.sub;

	const updateAddress = await S.updateUserAdressService(userId, req.body);
	return res.status(200).json(updateAddress);
};

export const deleteUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { userId } = req.params;

	await S.deleteUserService(userId);
	return res.status(204).json();
};
