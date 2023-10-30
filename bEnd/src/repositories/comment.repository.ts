import { AppDataSource } from "../data-source";
import * as E from "../entities";
import * as I from "../interfaces";

export const commentRepository: I.TCommentRepo = AppDataSource.getRepository(
	E.Comment
);
