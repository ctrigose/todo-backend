import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import http from "http";
import { PORT, BODY_LIMIT, NODE_ENV, PARAMETER_LIMIT } from "./constants";
import { DB } from "./db";
import { newRouter } from "./routes";
import { createErrorMiddleware } from "./util/error-middleware";
import { expressConfig } from "./util/express-config";

const shutdown =
  (deps: { server: http.Server; db: DB }) => async (): Promise<void> => {
    const { server, db } = deps;
    console.info(`Stopping server`);
    server.close();
    await db.close();
    console.info(`Service stopped`);
  };

/** Entry point */
const startup = async () => {
  console.info(`Initializing express...`);
  const app = express();
  expressConfig(app, {
    BODY_LIMIT,
    PARAMETER_LIMIT,
    NODE_ENV,
  });

  const db = new DB();
  await db.connect();
  await db.createTodoTable();

  app.use(newRouter({ db }));

  const errorMiddleware = createErrorMiddleware();
  app.use(errorMiddleware);

  const server = http.createServer(app);

  // Avoid crashing the app on unhandled rejections/uncaught exceptions
  process.on("unhandledRejection", (err) => {
    console.error("unhandledRejection:", err);
  });
  process.on("uncaughtException", (err) => {
    console.error(`uncaughtException ${err.stack}`);
  });

  process.on("SIGTERM", shutdown({ server, db }));
  process.on("SIGINT", shutdown({ server, db }));

  server.listen(PORT, "0.0.0.0", () => {
    console.info(`Service started: listening on port ${PORT}`);
  });
};

startup();
