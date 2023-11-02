import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
	"",
	M.validateBody(S.userCreateSchemaRequest),
	M.verifyEmailUserExists,
	M.verifyCpfUserExists,
	C.createUserController
);

userRouter.get("/:userId", M.verifyUserIdExists, C.readUserIdController);

userRouter.patch(
	"/:userId/profile",
	M.validateBody(S.userUpdateProfileSchemaRequest),
	M.verifyToken,
	M.verifyUserIdExists,
	M.isUserOrOwner,
	C.updateUserProfileController
);

userRouter.patch(
	"/:userId/address",
	M.validateBody(S.userUpdateAdressSchemaRequest),
	M.verifyToken,
	M.verifyUserIdExists,
	M.isUserOrOwner,
	C.updateUserAddressController
);

userRouter.delete(
	"/:userId",
	M.verifyToken,
	M.verifyUserIdExists,
	M.isUserOrOwner,
	C.deleteUserController
);
