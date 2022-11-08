import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TYPE_ORM_TYPES } from "src/common/constants";
import { User } from "../users/users.entity";

@Entity()
export class Movement {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: TYPE_ORM_TYPES.TEXT,
	})
	concept: string;

	@Column({
		type: TYPE_ORM_TYPES.NUMERIC,
	})
	amount: number;

	@Column({
		type: TYPE_ORM_TYPES.TEXT,
	})
	type: string;

	@ManyToOne(() => User, (user) => user.movements)
	user: User
}