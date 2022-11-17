import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovementModule } from '../movements.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../common/configuration';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE } from '../../../common/constants';
import { UserModule } from '../../../modules/users/users.module';
import * as request from 'supertest';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

describe('Movement Module e2e', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
				MovementModule,
				UserModule
			],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	const createMovementDto = {
		balanceId: 1,
		concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
		type: MOVEMENT_TYPE.NEGATIVE,
		amount: 50
	}

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

	it('/movements POST', async () => {
		//we must create a user to test our movements
		await request(app.getHttpServer())
			.post('/users')
			.send(createUserDto)
			.expect(201);

		const data = await request(app.getHttpServer())
			.post('/movements')
			.send(createMovementDto)
			.expect(201);
		expect(data.body).toEqual({
			amount: createMovementDto.amount,
			concept: createMovementDto.concept,
			type: createMovementDto.type,
			balanceId: createMovementDto.balanceId,
			id: expect.any(Number),
			createdAt: expect.any(String),
		});

		const notFoundBalance = await request(app.getHttpServer())
			.post('/movements')
			.send({ ...createMovementDto, balanceId: 100 })
			.expect(404);
		expect(notFoundBalance.body).toEqual({
			error: 'Not Found',
			message: 'Balance Not Found',
			statusCode: 404,
		});
	});

	it('/movements GET', async () => {
		const id = 1;
		const data = await request(app.getHttpServer())
			.get(`/movements/${id}`)
			.expect(200);
		expect(data.body).toEqual({
			amount: createMovementDto.amount,
			concept: createMovementDto.concept,
			type: createMovementDto.type,
			balanceId: createMovementDto.balanceId,
			id: id,
			createdAt: expect.any(String),
		});
		const failId = 100;
		const notFoundMovement = await request(app.getHttpServer())
			.get(`/movements/${failId}`)
			.expect(404);
		expect(notFoundMovement.body).toEqual({
			error: 'Not Found',
			message: 'Movement Not Found',
			statusCode: 404,
		});
	})
});
