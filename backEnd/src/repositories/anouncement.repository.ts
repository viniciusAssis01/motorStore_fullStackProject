import { AppDataSource } from "../data-source";
import * as E from "../entities";
import * as I from "../interfaces";

export const anouncementRepository: I.TAnouncementRepo =
	AppDataSource.getRepository(E.Anouncement);
