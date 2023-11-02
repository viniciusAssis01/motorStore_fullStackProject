import * as S from "../schemas";
import * as I from "../interfaces";
import * as E from "../entities";

import {
	anouncementRepository,
	imageRepository,
	userRepository,
} from "../repositories";
import { AppError } from "../error";

export const createAnnouncementAndImageService = async (
	userId: string,
	payload: I.TImageAndAnouncementCreateRequest
): Promise<I.TImageAndAnouncementResponse> => {
	const { images, ...anouncementBody } = payload;

	const userData = await userRepository.findOneBy({ id: userId });
	if (userData!.accountType != "anunciante")
		throw new AppError("Only advertisers can create ads", 403);

	const announcementCreate: E.Anouncement = anouncementRepository.create({
		user: userData!,
		...anouncementBody,
	});
	const announcement = await anouncementRepository.save(announcementCreate);

	var imageCreate;
	if (images!.length !== 0) {
		for await (const image of images!) {
			imageCreate = imageRepository.create({
				image_url: image.image_url,
				anouncement: announcementCreate,
			});

			await imageRepository.save(imageCreate);
		}
	}
	return S.imageAndAnnouncementCreateSchemaResponse.parse(
		await anouncementRepository.findOne({
			where: { id: announcement.id },
			relations: { images: true },
		})
	);
};

export const readAllAnnouncementService =
	async (): Promise<I.TImageAndAnouncementReadAll> => {
		const announcements: Array<E.Anouncement> =
			await anouncementRepository.find({
				relations: { user: { address: true }, images: true },
			});

		return S.announcementAndUserSchemaArrayResponse.parse(announcements);
	};

export const userAds = async (
	userId: string
): Promise<I.TUserReadIdResponse> => {
	const user = await userRepository.findOne({
		where: { id: userId },
		relations: { anouncements: { images: true }, address: true },
	});

	return S.userReadIdResponse.parse(user);
};

export const readAnnouncementIdService = async (
	anouncementId: string
): Promise<I.TAnnouncementAndUserResponse> => {
	const announcementAndUser = await anouncementRepository.findOne({
		where: { id: anouncementId },
		relations: { user: { address: true }, images: true },
	});
	return S.announcementAndUserSchemaResponse.parse(announcementAndUser);
};

export const updateAnnouncementAndImageService = async (
	anouncementId: string,
	userId: string,
	payloadReqBody: I.TImageAndAnouncementCreateRequest
): Promise<I.TImageAndAnouncementResponse> => {
	const { images, ...anouncementBody } = payloadReqBody;

	const foundAnouncement = await anouncementRepository.findOne({
		where: { id: anouncementId },
		relations: { user: true },
	});

	if (foundAnouncement!.user.id !== userId) {
		throw new AppError("Insufficient permission", 403);
	}

	const updateAnnouncement = await anouncementRepository.save({
		...foundAnouncement!,
		...anouncementBody,
	});

	const foundImages = await imageRepository.find({
		where: { anouncement: { id: anouncementId } },
	});
	foundImages.forEach((image) => {
		imageRepository.remove(image);
	});

	var updateImage;
	if (images!.length !== 0) {
		for await (const image of images!) {
			updateImage = imageRepository.create({
				image_url: image.image_url,
				anouncement: updateAnnouncement,
			});
			await imageRepository.save(updateImage);
		}
	}

	return S.imageAndAnnouncementCreateSchemaResponse.parse(
		await anouncementRepository.findOne({
			where: { id: updateAnnouncement.id },
			relations: { images: true },
		})
	);
};

export const deleteAnnouncementService = async (
	anouncementId: string,
	userId: string
): Promise<void> => {
	const anouncement: E.Anouncement | null = await anouncementRepository.findOne(
		{
			where: { id: anouncementId },
			relations: { user: true },
		}
	);
	if (anouncement!.user.id !== userId) {
		throw new AppError("Insufficient permission", 403);
	}

	await anouncementRepository.delete(anouncementId);
};
