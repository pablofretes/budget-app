import { Config } from "./configuration.interface";

const config: Config = {
	database: {
		dialect: process.env.DATABASE_DIALECT as string,
		host: process.env.DATABASE_HOST as string,
		port: Number(process.env.PORT),
		username: process.env.DATABASE_USERNAME as string,
		password: process.env.DATABASE_PASSWORD as string,
		databaseName: process.env.DATABASE_NAME as string
	}
}
export default config;