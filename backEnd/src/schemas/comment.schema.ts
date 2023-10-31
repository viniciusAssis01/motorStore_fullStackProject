import { z } from "zod";

export const commentSchemaResponse = z.object({
	id: z.string().max(36),
	comment: z.string().nonempty(),
	createdAt: z.string(),
	user: z.object({
		name: z.string(),
		cellphone: z.string(),
		id: z.string().max(36),
		description: z.string(),
		color: z.string(),
	}),
});

export const commentSchemaRequest = commentSchemaResponse.omit({
	id: true,
});

export const comentsreadAllSchema = commentSchemaResponse.array();

export const updateCommentRequest = commentSchemaRequest.partial();
