import { z } from "zod";
import * as S from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import * as E from "../entities";

export type TCommentRequest = z.infer<typeof S.commentSchemaRequest>;

export type TCommentResponse = z.infer<typeof S.commentSchemaResponse>;

export type TCommentReadAll = z.infer<typeof S.comentsreadAllSchema>;

export type TCommentUpdateRequest = z.infer<typeof S.updateCommentRequest>;
export type TCommentUpdateRequestDep = DeepPartial<TCommentUpdateRequest>;

export type TCommentRepo = Repository<E.Comment>;
