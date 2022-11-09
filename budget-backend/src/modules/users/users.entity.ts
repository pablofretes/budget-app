import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { TYPE_ORM_TYPES, CURRENT_TIMESTAMP } from '../../common/constants';
import { Balance } from '../balance/balance.entity';
import { Movement } from '../movements/movements.entity';
@Entity()
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ 
		type: TYPE_ORM_TYPES.VARCHAR,
		unique: true
	})
	username: string;
	
	@Column({
		type: TYPE_ORM_TYPES.VARCHAR,
		unique: true
	})
	email: string;

	@Column({
		type: TYPE_ORM_TYPES.VARCHAR
	})
	password: string;
	
	@Column({
		type: TYPE_ORM_TYPES.TIMESTAMP,
		default: () => CURRENT_TIMESTAMP
	})
	createdAt: Date;

	@OneToOne(() => Balance, (balance) => balance.user)
	@JoinColumn()
	balance: Balance

	@OneToMany(() => Movement, (movement) => movement.user)
	movements: Movement[]
}