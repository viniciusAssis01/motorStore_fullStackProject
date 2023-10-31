import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Anouncement } from "./anouncements.entity";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text" })
	comment: string;

	@CreateDateColumn({ type: "date" })
	createdAt: string;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@ManyToOne(() => Anouncement, (anouncement) => anouncement.comments, {
		onDelete: "CASCADE",
	})
	anouncement: Anouncement;
}
