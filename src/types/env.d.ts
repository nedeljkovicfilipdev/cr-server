declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		NODE_ENV: 'development' | 'production' | 'test';
		MONGO_INITDB_ROOT_USERNAME: string;
		MONGO_INITDB_ROOT_PASSWORD: string;
		MONGO_DB_NAME: string;
		MONGO_HOST: string;
		MONGO_PORT: string;
		DB_REINIT?: string;
	}
}
