import { configDotenv } from "dotenv";
configDotenv();

// Postgres connection
export const DB_NAME: string = process.env.DB_NAME ?? "todo";
export const DB_USER: string = process.env.DB_USER ?? "user";
export const DB_HOST: string = process.env.DB_HOST ?? "localhost";
export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? "password";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;

// Server config
export const PORT: number = Number(process.env.PORT) || 80;
export const NODE_ENV: string = process.env.NODE_ENV ?? "development";
export const BODY_LIMIT: string = process.env.BODY_LIMIT ?? "64kb";
export const PARAMETER_LIMIT: number =
  Number(process.env.PARAMETER_LIMIT) || 100;

export const dataConstraints = {
  todo: {
    name: {
      max: 50,
      min: 1,
    },
  },
};
