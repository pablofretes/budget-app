import { Test, TestingModule } from '@nestjs/testing';
import { setupDataSource } from '../../test-utils/test-database.providers';
import { UserController } from './users.controller';
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

	it('should be defined', () => {
		expect(userController).toBeDefined();
	})
});