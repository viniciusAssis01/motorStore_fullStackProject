import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const commentRouter: Router = Router();

commentRouter.post(
	"/:announcementId",
	M.validateBody(S.commentSchemaRequest),
	M.verifyToken,
	M.verifyAnouncementIdExists,
	C.createCommentController
);

commentRouter.get(
	"/:announcementId",
	M.verifyToken,
	M.verifyAnouncementIdExists,
	C.readAllCommentsController
);

commentRouter.patch(
	"/:commentId",
	M.validateBody(S.updateCommentRequest),
	M.verifyToken,
	M.verifyCommentsId,
	C.updateCommentController
);

commentRouter.delete(
	"/:commentId",
	M.verifyToken,
	M.verifyCommentsId,
	C.deleteCommentController
);
