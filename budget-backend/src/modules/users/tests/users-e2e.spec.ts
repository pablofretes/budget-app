import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RESPONSE_MESSAGES } from '../../../common/constants';
import * as request from 'supertest';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModule } from '../users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../common/configuration';

describe('User Module e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
        UserModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  const createUserDto: CreateUserDto = {
    username: 'pablo',
    password: '123456',
    email: 'fake@mail.com',
    initialAmount: 0,
    total: 0,
  };

  it('/user POST', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);
    //email taken error
    const badRequestUser = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(400);
    expect(badRequestUser.body).toEqual({
      error: 'Bad Request',
      message: 'Email is already taken',
      statusCode: 400,
    });
    //username taken error
    const createUserDtoDifferentEmail = {
      ...createUserDto,
      email: 'test@mail.com',
    };
    const badRequestEmail = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDtoDifferentEmail)
      .expect(400);
    expect(badRequestEmail.body).toEqual({
      error: 'Bad Request',
      message: 'Username is already taken',
      statusCode: 400,
    });
  });

  it('/user GET', async () => {
    const data = await request(app.getHttpServer()).get('/users').expect(200);
    expect(data.body).toEqual([
      {
        username: createUserDto.username,
        email: createUserDto.email,
        id: expect.any(Number),
        createdAt: expect.any(String),
        balance: expect.any(Object),
        password: expect.any(String),
      },
    ]);
  });

  it('/user/:id GET', async () => {
    const id = 1;
    const data = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200);
    expect(data.body).toEqual({
      username: createUserDto.username,
      email: createUserDto.email,
      id: id,
      createdAt: expect.any(String),
      balance: expect.any(Object),
      password: expect.any(String),
    });

    const failId = 2;
    const invalidIdError = await request(app.getHttpServer())
      .get(`/users/${failId}`)
      .expect(404);
    expect(invalidIdError.body).toEqual({
      error: 'Not Found',
      message: 'Invalid ID',
      statusCode: 404,
    });
  });

  it('/user LOGIN POST', async () => {
    const email = createUserDto.email;
    const password = createUserDto.password;
    const data = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email, password })
      .expect(201);
    expect(data.body).toEqual({ token: expect.any(String) });

    const failEmail = 'testError@mail.com';
    const invalidCredentialsEmail = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: failEmail, password })
      .expect(400);
    expect(invalidCredentialsEmail.body).toEqual({
      error: 'Bad Request',
      message: 'Invalid Credentials',
      statusCode: 400,
    });

    const failPassword = 'testPasswordError';
    const invalidCredentialsPassword = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email, password: failPassword })
      .expect(400);
    expect(invalidCredentialsPassword.body).toEqual({
      error: 'Bad Request',
      message: 'Invalid Credentials',
      statusCode: 400,
    });
  });

  it('/user DELETE', async () => {
    const id = 1;
    const data = await request(app.getHttpServer()).delete(`/users/${id}`);
    expect(data.body).toEqual({
      message: RESPONSE_MESSAGES.SUCCESSFULLY_DELETED,
    });

    const failId = 100;
    const userNotFound = await request(app.getHttpServer()).delete(
      `/users/${failId}`,
    );
    expect(userNotFound.body).toEqual({
      error: 'Not Found',
      message: 'User Not Found',
      statusCode: 404,
    });
  });
});
