export default () => ({
	dialect: process.env.DATABASE_DIALECT,
	database_host: process.env.DATABASE_HOST,
	database_port: Number(process.env.DATABASE_PORT),
	database_username: process.env.DATABASE_USER,
	database_user: process.env.DATABASE_USER,
	database_password: process.env.DATABASE_PASSWORD,
	database_name: process.env.DATABASE_NAME,
	jwt_secret: process.env.SECRET_KEY_JWT,
	test_database_name: process.env.TEST_DATABASE_NAME,
})