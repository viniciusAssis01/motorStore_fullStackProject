import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as E from "./index";

@Entity("images")
export class Image {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: true })
	image_url?: string | undefined | null;

	@ManyToOne(() => E.Anouncement, (anouncement) => anouncement.images, {
		onDelete: "CASCADE",
	})
	anouncement: E.Anouncement;
}
