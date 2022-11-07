import { TYPE_ORM_TYPES } from "src/common/constants";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Balance {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: TYPE_ORM_TYPES.DOUBLE
	})
	total: number;

	@Column({
		type: TYPE_ORM_TYPES.DOUBLE
	})
	initialAmount: number;

	@OneToOne(() => User, (user) => user.balance)
	user: User
}