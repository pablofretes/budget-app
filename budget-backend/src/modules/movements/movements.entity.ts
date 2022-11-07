import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TYPE_ORM_PROPERTIES_LENGTHS, TYPE_ORM_TYPES } from "src/common/constants";
import { User } from "../users/users.entity";

@Entity()
export class Movement {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: TYPE_ORM_PROPERTIES_LENGTHS.CONCEPT_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	concept: string;

	@Column({
		type: TYPE_ORM_TYPES.DOUBLE,
	})
	amount: number;

	@Column({
		length: TYPE_ORM_PROPERTIES_LENGTHS.TYPE_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	type: string;

	@ManyToOne(() => User, (user) => user.movements)
	user: User
}