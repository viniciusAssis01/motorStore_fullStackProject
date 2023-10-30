import { AppDataSource } from "../data-source";
import * as E from "../entities";
import * as I from "../interfaces";

export const addressRepository: I.TAdressRepo = AppDataSource.getRepository(
	E.Address
);
