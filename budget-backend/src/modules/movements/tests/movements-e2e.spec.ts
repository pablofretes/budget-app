import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovementModule } from '../movements.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../common/configuration';
import { MOVEMENT_CONCEPT, MOVEMENT_TYPE, RESPONSE_MESSAGES } from '../../../common/constants';
import { UserModule } from '../../../modules/users/users.module';
import * as request from 'supertest';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';
import { CreateMovementDto } from '../dto/create-movement.dto';
import { UpdateMovementDto } from '../dto/update-movement.dto';

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

	const createMovementDto: CreateMovementDto = {
		balanceId: 1,
		concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
		type: MOVEMENT_TYPE.NEGATIVE,
		amount: 50
	}

	const updateMovementDto: UpdateMovementDto = {
		concept: MOVEMENT_CONCEPT.ENTERTAINMENT,
		type: MOVEMENT_TYPE.NEGATIVE,
		amount: 500
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
	});

	it('/movements PUT', async () => {
		const id = 1;
		const updateAmount = await request(app.getHttpServer())
			.put(`/movements/${id}`)
			.send({ type: updateMovementDto.type, amount: updateMovementDto.amount })
			.expect(200)
		expect(updateAmount.body).toEqual({
			amount: updateMovementDto.amount,
			concept: createMovementDto.concept,
			type: createMovementDto.type,
			balanceId: expect.any(Number),
			id: id,
			createdAt: expect.any(String),
		});

		const updateConcept = await request(app.getHttpServer())
			.put(`/movements/${id}`)
			.send({ type: updateMovementDto.type, concept: updateMovementDto.concept })
			.expect(200)
		expect(updateConcept.body).toEqual({
			amount: updateMovementDto.amount,
			concept: updateMovementDto.concept,
			type: createMovementDto.type,
			balanceId: expect.any(Number),
			id: id,
			createdAt: expect.any(String),
		});

		const updateType = await request(app.getHttpServer())
			.put(`/movements/${id}`)
			.send({ type: updateMovementDto.type })
			.expect(200)
		expect(updateType.body).toEqual({
			amount: updateMovementDto.amount,
			concept: updateMovementDto.concept,
			type: updateMovementDto.type,
			balanceId: expect.any(Number),
			id: id,
			createdAt: expect.any(String),
		});

		const failId = 100;
		const notFoundMovement = await request(app.getHttpServer())
			.put(`/movements/${failId}`)
			.send({ type: updateMovementDto.type })
			.expect(404)
		expect(notFoundMovement.body).toEqual({
			error: 'Not Found',
			message: 'Movement Not Found',
			statusCode: 404,
		});

		const noTypeBadRequest = await request(app.getHttpServer())
			.put(`/movements/${failId}`)
			.send({ amount: updateMovementDto.amount })
			.expect(400)
		expect(noTypeBadRequest.body).toEqual({
			error: 'Bad Request',
			message: 'Tried to update a movement with no movement type',
			statusCode: 400,
		});
	});

	it('/movements DELETE', async () => {
		const id = 1;
    const data = await request(app.getHttpServer()).delete(`/movements/${id}`);
    expect(data.body).toEqual({
      message: RESPONSE_MESSAGES.SUCCESSFULLY_DELETED,
    });

		const failId = 100;
    const movementNotFound = await request(app.getHttpServer()).delete(
      `/movements/${failId}`,
    );
    expect(movementNotFound.body).toEqual({
      error: 'Not Found',
      message: 'Movement Not Found',
      statusCode: 404,
    });
	})
});
