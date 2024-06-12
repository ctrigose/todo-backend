import { configDotenv } from "dotenv";
configDotenv();

// Postgres connection
export const DB_NAME: string = process.env.DB_NAME || "todo";
export const DB_USER: string = process.env.DB_USER || "user";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "password";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;

// Server port
export const PORT: number = Number(process.env.PORT) || 80;

export const dataConstraints = {
  todo: {
    name: {
      max: 100,
      min: 1,
    },
  },
};
