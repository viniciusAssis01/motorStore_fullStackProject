import { z } from "zod";
import * as S from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import * as E from "../entities";

export type TImageAndAnouncementCreateRequest = z.infer<
	typeof S.imageAndAnnouncementCreateSchemaRequest
>;
export type TImageAnouncmentCreateRequest =
	DeepPartial<TImageAndAnouncementCreateRequest>;

export type TImageAndAnouncementResponse = z.infer<
	typeof S.imageAndAnnouncementCreateSchemaResponse
>;

export type TImageAndAnouncementUpdate = z.infer<
	typeof S.imageAndAnnouncementUpdateSchemaRequest
>;
export type TImageAndAnouncementUpdateRequest =
	DeepPartial<TImageAndAnouncementUpdate>;

export type TImageAndAnouncementReadAll = z.infer<
	typeof S.imageAndAnnouncementReadAllSchema
>;

export type TAnnouncementAndUserResponse = z.infer<
	typeof S.announcementAndUserSchemaResponse
>;

export type TImageRepo = Repository<E.Image>;
export type TAnouncementRepo = Repository<E.Anouncement>;
