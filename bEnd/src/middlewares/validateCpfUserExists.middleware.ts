import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { User } from "../entities";
import * as repository from "../repositories";

export const verifyCpfUserExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const cpf: string = req.body.cpf;
	if (!cpf) return next();

	const foundCpf: User | null = await repository.userRepository.findOneBy({
		cpf: cpf,
	});

	if (foundCpf) throw new AppError("Cpf already exists", 409);

	return next();
};
