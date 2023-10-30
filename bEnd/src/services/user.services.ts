import * as S from "../schemas";
import * as I from "../interfaces";
import * as E from "../entities";
import { userRepository, addressRepository } from "../repositories";
import { AppError } from "../error";

export const createUserService = async (
	payload: I.TUserCreateRequest
): Promise<I.TUserCreateResponse> => {
	const { address, ...userBody } = payload;

	const addressCreate: E.Address = addressRepository.create(address);
	await addressRepository.save(addressCreate);

	const colors = ["#E34D8C", "#C04277", "#7D2A4D"];

	const randonPosition = Math.floor(Math.random() * colors.length);
	console.log(randonPosition);

	const userCreate: E.User = userRepository.create({
		...userBody,
		address: addressCreate,
		color: colors[randonPosition],
	});
	await userRepository.save(userCreate);

	return S.userCreateResponse.parse(userCreate);
};

export const readUserIdService = async (
	userId: string
): Promise<I.TUserReadIdResponse> => {
	const user = await userRepository.findOne({
		where: { id: userId },
		relations: { anouncements: { images: true }, address: true },
	});

	return S.userReadIdResponse.parse(user);
};

export const updateUserProfileService = async (
	userId: string,
	payloadReqBody: I.TUserBodyUpdateProfile
): Promise<I.TUserUpdateProfileResponse> => {
	const foundUser: E.User | null = await userRepository.findOneBy({
		id: userId,
	});
	const updateUserProfile = await userRepository.save({
		...foundUser,
		...payloadReqBody,
	});

	return S.userUpdateProfileSchemaResponse.parse(updateUserProfile);
};

export const updateUserAdressService = async (
	userId: string,
	payloadReqBody: I.TUserBodyUpdateAddress
): Promise<I.TUserUpdateAddressResponse> => {
	const foundUser: E.User | null = await userRepository.findOne({
		where: { id: userId },
		relations: { address: true },
	});

	const foundAddress: E.Address | null = await addressRepository.findOneBy({
		id: foundUser!.address.id,
	});
	const updateUserAddress = await addressRepository.save({
		...foundAddress,
		...payloadReqBody,
	});

	return S.userUpdateAddressSchemaResponse.parse(updateUserAddress);
};

export const deleteUserService = async (userId: string): Promise<void> => {
	const foundUser: E.User | null = await userRepository.findOne({
		where: { id: userId },
		relations: { address: true },
	});
	const addressId = foundUser!.address.id;

	await userRepository.delete(userId);

	await addressRepository.delete(addressId);
};
