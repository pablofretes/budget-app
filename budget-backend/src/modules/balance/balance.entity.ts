import { TYPE_ORM_TYPES } from "src/common/constants";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}