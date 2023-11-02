import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const anouncementRouter: Router = Router();

anouncementRouter.post(
	"",
	M.validateBody(S.imageAndAnnouncementCreateSchemaRequest),
	M.verifyToken,
	C.createAnnouncementController
);

anouncementRouter.get("", C.readAllAnnouncementController);

anouncementRouter.get(
	"/:announcementId",
	M.verifyAnouncementIdExists,
	C.readAnnouncementIdController
);

anouncementRouter.get(
	"/user/:userId",
	M.verifyUserIdExists,
	C.userAdsController
);

anouncementRouter.put(
	"/:announcementId",
	M.validateBody(S.imageAndAnnouncementCreateSchemaRequest),
	M.verifyToken,
	M.verifyAnouncementIdExists,
	C.updateAnnouncementController
);

anouncementRouter.delete(
	"/:announcementId",
	M.verifyToken,
	M.verifyAnouncementIdExists,
	C.deleteAnnouncementController
);
