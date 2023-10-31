import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const sessionRouter: Router = Router();

sessionRouter.post(
	"",
	M.validateBody(S.sessionSchema),
	C.createSessionController
);
