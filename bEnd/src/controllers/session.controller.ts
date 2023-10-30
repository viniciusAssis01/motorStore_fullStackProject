import { Request, Response } from "express";
import * as I from "../interfaces";
import * as S from "../services";

export const createSessionController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const token: I.TSessionResponse = await S.createSessionService(req.body);
	return res.status(200).json(token);
};
