import { AppDataSource } from "../data-source";
import * as E from "../entities";
import * as I from "../interfaces";
export const userRepository: I.TUserRepo = AppDataSource.getRepository(E.User);
