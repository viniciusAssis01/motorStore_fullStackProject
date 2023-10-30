import { z } from "zod";
import * as S from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import * as E from "../entities";

export type TUserCreateRequest = z.infer<typeof S.userCreateSchemaRequest>;
export type TUserCreateResponse = z.infer<typeof S.userCreateResponse>;

export type TUserBodyUpdateProfile = DeepPartial<TUserCreateRequest>;
export type TUserUpdateProfileResponse = z.infer<
	typeof S.userUpdateProfileSchemaResponse
>;

export type TUserReadIdResponse = z.infer<typeof S.userReadIdResponse>;

export type TUserUpdateAddressRequest = DeepPartial<
	typeof S.userUpdateAdressSchemaRequest
>;
export type TUserBodyUpdateAddress = DeepPartial<TUserUpdateAddressRequest>;
export type TUserUpdateAddressResponse = z.infer<
	typeof S.userUpdateAddressSchemaResponse
>;

export type TUserRepo = Repository<E.User>;
export type TAdressRepo = Repository<E.Address>;
