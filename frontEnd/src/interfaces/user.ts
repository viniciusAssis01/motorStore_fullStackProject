import { iAddress } from "./address";
import { iAnnouncements } from "./announcements";

export interface iUser {
  accountType: string,
  address: iAddress[],
  anouncements: iAnnouncements[],
  cellphone: string,
  color: string,
  cpf: string,
  dateBirth: string,
  description: string,
  email: string,
  id: string,
  name: string
}