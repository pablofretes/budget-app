import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { setupDataSource } from '../../test-utils/test-database.providers';
import { BalanceModule } from '../balance/balance.module';
import { BalanceService } from '../balance/balance.service';
import { UserController } from './users.controller';
import { UserModule } from './users.module';
import { UserService } from './users.service';
import { UserValidations } from './users.validations';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';

describe('UserController', () => {
	let userController: UserController;
	
	beforeEach(async () => {
		const dataSource = await setupDataSource();
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					name: 'default',
					synchronize: true,
				}),
				AppModule,
			],
		}).overrideProvider(DataSource).useValue(dataSource).compile();

		userController = module.get<UserController>(UserController);
	});

	//i dont have different environmnents set up for now
	it('should be defined', () => {
		expect(userController).toBeDefined();
	})
});