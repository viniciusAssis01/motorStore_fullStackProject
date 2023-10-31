import { Request, Response } from "express";
import * as I from "../interfaces";
import * as S from "../services";

export const getAuthenticatedUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userIdByToken = res.locals.decoded.sub;
	const user: I.TUserCreateResponse = await S.getAuthenticatedUserService(
		userIdByToken
	);
	return res.status(200).json(user);
};
