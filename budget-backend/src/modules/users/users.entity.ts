import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { TYPE_ORM_TYPES, TYPE_ORM_PROPERTIES_LENGTHS } from '../../common/constants';
import { Balance } from '../balance/balance.entity';
import { Movement } from '../movements/movements.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ 
		length: TYPE_ORM_PROPERTIES_LENGTHS.NAME_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	name: string;

	@Column({
		length: TYPE_ORM_PROPERTIES_LENGTHS.EMAIL_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	email: string;

	@Column({
		length: TYPE_ORM_PROPERTIES_LENGTHS.PASSWORD_LENGTH,
		type: TYPE_ORM_TYPES.TEXT
	})
	password: string;

	@OneToOne(() => Balance, (balance) => balance.user)
	@JoinColumn()
	balance: Balance

	@OneToMany(() => Movement, (movement) => movement.user)
	movements: Movement[]
}