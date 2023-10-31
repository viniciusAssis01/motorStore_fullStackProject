import { User } from "./users.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	zipCode: string;

	@Column({ length: 20 })
	state: string;

	@Column({ length: 45 })
	city: string;

	@Column({ length: 45 })
	street: string;

	@Column()
	number: string;

	@Column({ length: 10 })
	complement: string;

	@OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
	user: User;
}
