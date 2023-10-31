import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const profileRouter: Router = Router();

profileRouter.get("", M.verifyToken, C.getAuthenticatedUserController);
