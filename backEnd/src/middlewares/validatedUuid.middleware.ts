import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const validateUuid = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const uuidParam = req.params.userId;

	const uuidValidate = require("uuid-validate");

	if (!uuidValidate(uuidParam)) throw new AppError("Invalid uuid", 400);

	return next();
};

/* const uuidPattern =
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const uuidParams = uuid

    if(uuidParams !== uuidPattern){

    } */

/* const uuidValidate = require("uuid-validate");

// Middleware de validação de UUID
function validateUuid(req, res, next) {
	const paramValue = req.params.uuid; // Suponhamos que o parâmetro seja chamado "uuid"

	if (uuidValidate(paramValue, 4)) {
		// Se o UUID for válido, siga para a próxima middleware
		next();
	} else {
		// Caso contrário, retorne um erro 400 (Bad Request)
		res.status(400).json({ error: "UUID inválido" });
	}
} */
