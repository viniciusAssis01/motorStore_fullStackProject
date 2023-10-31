import { getRounds, hashSync } from "bcryptjs";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import * as E from "./index";

export enum AT {
	COMPRADOR = "comprador",
	ANUNCIANTE = "anunciante",
}

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 45 })
	name: string;

	@Column({ length: 45, unique: true })
	email: string;

	@Column({ length: 11, unique: true })
	cpf: string;

	@Column({ length: 15 })
	cellphone: string;

	@Column()
	color: string;

	@Column({ type: "date" })
	dateBirth: string;

	@Column({ type: "text" })
	description: string;

	@Column({ type: "enum", enum: AT })
	accountType: AT;

	@Column({ length: 120 })
	password: string;

	@OneToOne(() => E.Address, (address) => address.user, { cascade: true })
	@JoinColumn()
	address: E.Address;

	@OneToMany(() => E.Anouncement, (anoucement) => anoucement.user, {
		cascade: true,
	})
	anouncements: E.Anouncement[];

	@OneToMany(() => E.Comment, (comment) => comment.user)
	comments: E.Comment[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const hasRounds: number = getRounds(this.password);
		if (!hasRounds) {
			this.password = hashSync(this.password, 10);
		}
	}
}
