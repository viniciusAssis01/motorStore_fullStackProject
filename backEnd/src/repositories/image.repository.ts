import { AppDataSource } from "../data-source";
import * as E from "../entities";
import * as I from "../interfaces";

export const imageRepository: I.TImageRepo = AppDataSource.getRepository(
	E.Image
);
