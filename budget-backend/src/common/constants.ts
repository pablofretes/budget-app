export const DATABASE_TYPE = "postgres";

export enum PROVIDERS {
	BALANCE_PROVIDERS = "BALANCE_REPOSITORY",
	USER_PROVIDERS = "USERS_REPOSITORY",
	MOVEMENT_PROVIDERS = "MOVEMENTS_REPOSITORY",
	ORM_PROVIDER = "DATA_SOURCE",
	USERS_SERVICE = "USERS_SERVICE",
	USERS_VALIDATIONS = "USERS_VALIDATIONS",
	BALANCE_SERVICE = "BALANCE_SERVICE",
	MOVEMENTS_SERVICE = "MOVEMENTS_SERVICE",
}

export enum CONFIG_CONSTANTS {
	DATABASE_HOST = "database_host",
	DATABASE_PORT = "database_port",
	DATABASE_USERNAME = "database_username",
	DATABASE_USER = "database_user",
	DATABASE_PASSWORD = "database_password",
	DATABASE_NAME = "database_name",
	JWT_SECRET = "jwt_secret",
	NODE_ENV = "NODE_ENV",
}

export enum ERROR_MESSAGES {
	INVALID_EMAIL = "Invalid email",
	INVALID_CREDENTIALS = "Invalid Credentials",
	INVALID_USERNAME = "Invalid Username",
	INVALID_ID = "Invalid ID",
	USERNAME_TAKEN = "Username is already taken",
	EMAIL_TAKEN = "Email is already taken",
}

export enum RELATIONS {
	BALANCE = "balance",
	MOVEMENTS = "movements"
}

export enum TYPE_ORM_TYPES {
	VARCHAR = "varchar",
	NUMERIC = "numeric",
	INT = "int",
	TIMESTAMP = "timestamptz",
}

export const CURRENT_TIMESTAMP = "CURRENT_TIMESTAMP";

export const HASH_SALT = 10;