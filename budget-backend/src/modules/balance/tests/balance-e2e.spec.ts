import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceModule } from '../balance.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../common/configuration';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE, RESPONSE_MESSAGES } from '../../../common/constants';
import { UserModule } from '../../../modules/users/users.module';
import * as request from 'supertest';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

describe('Movement Module e2e', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
				BalanceModule,
				UserModule
			],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});
	const createUserDto: CreateUserDto = {
		username: 'pablo',
		password: '123456',
		email: 'fake@mail.com',
		initialAmount: 0,
		total: 0,
	};

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	it('/balance GET', async () => {
		//we must create a user to test our balance
		await request(app.getHttpServer())
			.post('/users')
			.send(createUserDto)
			.expect(201);

		const id = 1;
		const data = await request(app.getHttpServer())
			.get(`/balance/${id}`)
			.expect(200);
		expect(data.body).toEqual({
			initialAmount: createUserDto.initialAmount,
			total: createUserDto.total,
			id: id,
			movements: expect.any(Array),
			createdAt: expect.any(String),
		});
		const failId = 100;
		const notFoundBalance = await request(app.getHttpServer())
			.get(`/balance/${failId}`)
			.expect(404);
		expect(notFoundBalance.body).toEqual({
			error: 'Not Found',
			message: 'Balance Not Found',
			statusCode: 404,
		});
	});

	it('/balance PUT', async () => {
		const id = 1;
		const amount = 500;
		const data = await request(app.getHttpServer())
			.put(`/balance/update-balance/${id}`)
			.send({ amount })
			.expect(200)
		expect(data.body).toEqual({
			initialAmount: amount,
			total: amount,
			id: id,
			movements: expect.any(Array),
			createdAt: expect.any(String),
		});

		const failId = 100;
		const amountFail = 500;
		const notFoundBalance = await request(app.getHttpServer())
			.put(`/balance/update-balance/${failId}`)
			.send({ amount: amountFail })
			.expect(404)
		expect(notFoundBalance.body).toEqual({
			error: 'Not Found',
			message: 'Balance Not Found',
			statusCode: 404,
		});
	})
})