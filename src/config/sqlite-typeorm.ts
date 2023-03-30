export const sqliteOptions = {
  type: process.env.DB_TYPE,
  database: process.env.DB_HOST,
  entities: [`${__dirname}/**/*.entity{.js,.ts}`],
  migrations: [`${__dirname}/migration/{.ts,*.js}`],
  migrationsRun: true,
};
