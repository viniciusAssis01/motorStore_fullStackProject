import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import * as E from "./index";
export enum GE {
	GASOLINA = "gasolina",
	ETANOL = "etanol",
	FLEX = "flex",
	ELETRICO = "eletrico",
	HIBRIDO = "híbrido",
}

@Entity("anouncements")
export class Anouncement {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 45 })
	brand: string;

	@Column({ length: 120 })
	model: string;

	@Column()
	year: number;

	@Column({ type: "enum", enum: GE, default: GE.GASOLINA })
	fuel: GE;

	@Column({ type: "integer" })
	mileage: number;

	@Column({ length: 45 })
	color: string;

	@Column()
	fipeTablePrice: string;

	@Column()
	price: number;

	@Column({ type: "text" })
	description: string;

	@Column({ type: "text" })
	coverImage: string;

	@OneToMany(() => E.Image, (image) => image.anouncement, { cascade: true })
	images: E.Image[] | undefined | null;

	@OneToMany(() => E.Comment, (comment) => comment.anouncement, {
		cascade: true,
	})
	comments: E.Comment[];

	@ManyToOne(() => E.User, (user) => user.anouncements, {
		onDelete: "CASCADE",
	})
	user: E.User;
}
