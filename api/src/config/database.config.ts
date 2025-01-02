import { DataSource, DataSourceOptions } from 'typeorm';

export const getDatabaseConfig = (): DataSourceOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'production',
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        const dataSource = new DataSource(getDatabaseConfig());
        const connection = await dataSource.initialize();
        console.log('Database connection established');
        return connection;
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }
    },
  },
];