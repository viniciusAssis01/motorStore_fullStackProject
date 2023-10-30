import { z } from "zod";
import { AT } from "../entities/users.entity";
import * as S from "../schemas";

export const userSchema = z.object({
	id: z.string().max(36),
	name: z.string().max(45),
	email: z.string().max(45).email(),
	cpf: z.string().max(11),
	cellphone: z.string().max(15),
	dateBirth: z.string().max(45),
	description: z.string().nonempty(),
	accountType: z.nativeEnum(AT),
	password: z.string().max(120),
	color: z.string(),
	address: z.object({
		id: z.string().max(36),
		zipCode: z.string(),
		state: z.string().max(20),
		city: z.string().max(45),
		street: z.string().max(45),
		number: z.string(),
		complement: z.string().max(10),
	}),
});
export const onlyUser = userSchema.omit({ address: true });

export const userCreateSchemaRequest = z.object({
	name: z.string().max(45),
	email: z.string().max(45).email(),
	cpf: z.string().max(11),
	cellphone: z.string().max(15),
	dateBirth: z.string().max(45),
	description: z.string().nonempty(),
	accountType: z.nativeEnum(AT),
	password: z.string().max(120),
	address: z.object({
		zipCode: z.string(),
		state: z.string().max(20),
		city: z.string().max(45),
		street: z.string().max(45),
		number: z.string(),
		complement: z.string().max(10),
	}),
});

export const userCreateResponse = userSchema.omit({ password: true });

export const userReadIdResponse = userCreateResponse.extend({
	anouncements: S.announcementsAndImageArray,
});

export const userUpdateProfileSchemaRequest = userCreateSchemaRequest
	.omit({
		address: true,
	})
	.partial();

export const userUpdateProfileSchemaResponse = userSchema.omit({
	address: true,
	password: true,
});

export const userUpdateAdressSchemaRequest = z
	.object({
		zipCode: z.string(),
		state: z.string().max(20),
		city: z.string().max(45),
		street: z.string().max(45),
		number: z.string(),
		complement: z.string().max(10),
	})
	.partial();

export const userUpdateAddressSchemaResponse = z.object({
	id: z.string().max(36),
	zipCode: z.string(),
	state: z.string().max(20),
	city: z.string().max(45),
	street: z.string().max(45),
	number: z.string(),
	complement: z.string().max(10),
});
