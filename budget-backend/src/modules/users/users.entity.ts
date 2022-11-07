import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { NAME_LENGTH, EMAIL_LENGTH, PASSWORD_LENGTH, TYPE_ORM_TYPES } from '../../common/constants';
import { Balance } from '../balance/balance.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ 
		length: NAME_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	name: string;

	@Column({
		length: EMAIL_LENGTH,
		type: TYPE_ORM_TYPES.TEXT,
	})
	email: string;

	@Column({
		length: PASSWORD_LENGTH,
		type: TYPE_ORM_TYPES.TEXT
	})
	password: string;

	@OneToOne(() => Balance)
	@JoinColumn()
	balance: Balance
}