import { z } from "zod";
import * as S from "../schemas";

export type TSessionRequest = z.infer<typeof S.sessionSchema>;
export type TSessionResponse = {
	token: string;
};
