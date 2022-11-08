import { Config } from "./configuration.interface";

export default () => ({
	database: {
		dialect: process.env.DATABASE_DIALECT,
		host: process.env.DATABASE_HOST,
		port: Number(process.env.PORT),
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD as string,
		databaseName: process.env.DATABASE_NAME
	}
})