import { z } from "zod";
import { GE } from "../entities/anouncements.entity";

export const imageAndAnnouncementCreateSchemaRequest = z.object({
	brand: z.string().max(45),
	model: z.string().max(120),
	year: z.number().positive(),
	fuel: z.nativeEnum(GE),
	mileage: z.number().positive().or(z.number().default(0)),
	color: z.string().max(45).nonempty(),
	fipeTablePrice: z.string(),
	price: z.number().positive(),
	description: z.string().nonempty(),
	coverImage: z.string().nonempty(),
	images: z
		.object({
			image_url: z.string().optional(),
		})
		.array()
		.nullish(),
});
export const imageAndAnnouncementUpdateSchemaRequest =
	imageAndAnnouncementCreateSchemaRequest.partial();

export const imageAndAnnouncementCreateSchemaResponse = z.object({
	id: z.string().max(36),
	brand: z.string().max(45),
	model: z.string().max(120),
	year: z.number().positive(),
	fuel: z.nativeEnum(GE),
	coverImage: z.string().nonempty(),
	mileage: z.number().positive().or(z.number().default(0)),
	color: z.string().max(45).nonempty(),
	fipeTablePrice: z.string(),
	price: z.number().positive(),
	description: z.string().nonempty(),
	images: z
		.object({
			id: z.string().max(36),
			image_url: z.string(),
		})
		.array(),
});
export const announcementsAndImageArray =
	imageAndAnnouncementCreateSchemaResponse.array();

export const announcementAndUserSchemaResponse = z.object({
	id: z.string().max(36),
	brand: z.string().max(45),
	model: z.string().max(120),
	year: z.number().positive(),
	fuel: z.nativeEnum(GE),
	coverImage: z.string().nonempty(),
	mileage: z.number().positive().or(z.number().default(0)),
	color: z.string().max(45).nonempty(),
	fipeTablePrice: z.string(),
	price: z.number().positive(),
	description: z.string().nonempty(),
	images: z
		.object({
			id: z.string().max(36),
			image_url: z.string(),
		})
		.array(),
	user: z.object({
		name: z.string(),
		cellphone: z.string(),
		id: z.string().max(36),
		description: z.string(),
		color: z.string(),
	}),
});

export const announcementAndUserSchemaArrayResponse =
	announcementAndUserSchemaResponse.array();

export const imageAndAnnouncementReadAllSchema =
	imageAndAnnouncementCreateSchemaResponse.array();
