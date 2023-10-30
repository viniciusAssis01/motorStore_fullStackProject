import "dotenv/config";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../error";
import * as I from "../interfaces";
import * as E from "../entities";
import * as repository from "../repositories";

export const createSessionService = async ({
	email,
	password,
}: I.TSessionRequest): Promise<I.TSessionResponse> => {
	const foundUser: E.User | null = await repository.userRepository.findOneBy({
		email: email,
	});
	if (!foundUser) throw new AppError("Invalid credentials", 401);

	const samePwd: boolean = await compare(password, foundUser.password);
	if (!samePwd) throw new AppError("Invalid credentials", 401);

	const token: string = sign(
		{
			name: foundUser.name,
			email: foundUser.email,
			accountType: foundUser.accountType,
		},
		process.env.SECRET_KEY!,
		{ subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
	);

	return { token };
};
