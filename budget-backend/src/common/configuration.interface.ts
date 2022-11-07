export interface Config {
	database: {
		dialect: string
		host: string
		port: number
		username: string
		password: string
		databaseName: string
	}
}