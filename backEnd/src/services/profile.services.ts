import * as S from "../schemas";
import * as I from "../interfaces";
import { userRepository } from "../repositories";

export const getAuthenticatedUserService = async (
	userIdByToken: string
): Promise<I.TUserCreateResponse> => {
	const user = await userRepository.findOne({
		where: { id: userIdByToken },
		relations: { address: true },
	});
	return S.userCreateResponse.parse(user);
};
