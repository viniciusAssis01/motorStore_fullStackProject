import { handleError } from "./handleErrors.middlewares";
import { isUserOrOwner } from "./isUserOrOwner.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyCpfUserExists } from "./validateCpfUserExists.middleware";
import { verifyEmailUserExists } from "./validateEmailUserExists.middleware";
import { validateUuid } from "./validatedUuid.middleware";
import { verifyAnouncementIdExists } from "./verifyAnouncementIdExists.middleware";
import { verifyCommentsId } from "./verifyCommentIdExist.middleware";
import { verifyToken } from "./verifyToken.middleware";
import { verifyUserIdExists } from "./verifyUserIdExists.middleware";

export {
	handleError,
	validateBody,
	verifyEmailUserExists,
	verifyCpfUserExists,
	verifyToken,
	isUserOrOwner,
	verifyUserIdExists,
	verifyAnouncementIdExists,
	validateUuid,
	verifyCommentsId,
};
