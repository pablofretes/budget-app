import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CURRENT_TIMESTAMP, TYPE_ORM_TYPES } from "../../common/constants";
import { Balance } from "../balance/balance.entity";
import { User } from "../users/users.entity";

@Entity()
export class Movement {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({
		type: TYPE_ORM_TYPES.VARCHAR,
	})
	concept: string;

	@Column({
		type: TYPE_ORM_TYPES.NUMERIC,
	})
	amount: number;

	@Column({
		type: TYPE_ORM_TYPES.VARCHAR,
	})
	type: string;

	@Column({
		type: TYPE_ORM_TYPES.TIMESTAMP,
		default: () => CURRENT_TIMESTAMP
	})
	createdAt: Date;

	@ManyToOne(() => Balance, (balance) => balance.movements)
	balance: Balance
}