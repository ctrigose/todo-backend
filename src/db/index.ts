import { Client, Pool } from "pg";
import { DB_PASSWORD, DB_USER, DB_HOST, DB_NAME, DB_PORT } from "../constants";
import { NewTodo } from "../types";
import { dataConstraints } from "../constants";

/**
 * Handles postgres connection, including methods for performing CRUD operations on the todo table.
 * Uses environment variables for configuring the connection (refer to src/example.env for options)
 */
export class DB {
  client: Client;
  pool: Pool;

  constructor() {
    console.info("Creating db instance...");
    this.client = new Client({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    this.pool = new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    console.info("Db instance created");
  }

  /** Connects to db using config defined in environment variables (refer to src/example.env for options) */
  async connect() {
    console.info("Initializing DB client");
    await this.client.connect();
    console.info("DB client connected");
  }

  /** Creates todo table if not present */
  async createTodoTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${DB_NAME}(
        id SERIAL PRIMARY KEY,
        name VARCHAR(${dataConstraints.todo.name.max}),
        created_on TIMESTAMP,
        completed BOOLEAN NOT NULL)`;
    await this.client.query(query);
    console.info(`Created table: ${DB_NAME}`);
  }

  /** Deletes todo table if present */
  async deleteTodoTable() {
    const query = `DROP TABLE IF EXISTS ${DB_NAME}`;
    await this.client.query(query);
    console.info(`Deleted table: ${DB_NAME}`);
  }

  /** Retrieves all todos */
  async getAll() {
    return await this.pool.query("SELECT * FROM todo ORDER BY id ASC");
  }

  /** Retrieves single todo by id */
  async getById(id: number) {
    return await this.pool.query("SELECT * FROM todo WHERE id = $1", [id]);
  }

  /**
   * Adds new todo by passing name and completed values
   * id and created_on are automatically generated
   */
  async add(todo: NewTodo) {
    const { name, completed } = todo;
    return await this.pool.query(
      `INSERT INTO "todo" (name, completed, created_on) VALUES ($1, $2, NOW())`,
      [name, completed]
    );
  }

  /** Updates name of todo by id */
  async renameById(id: number, todo: Pick<NewTodo, "name">) {
    const { name } = todo;
    return await this.pool.query("UPDATE todo SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
  }

  /** Sets todo as completed */
  async setAsCompletedById(id: number) {
    return await this.pool.query(
      "UPDATE todo SET completed = $1 WHERE id = $2",
      [true, id]
    );
  }

  /** Sets todo as not completed */
  async setAsNotCompletedById(id: number) {
    return await this.pool.query(
      "UPDATE todo SET completed = $1 WHERE id = $2",
      [false, id]
    );
  }

  /** Deletes todo by id */
  async deleteById(id: number) {
    return await this.pool.query("DELETE FROM todo WHERE id = $1", [id]);
  }

  /** Shuts down db connection gracefully */
  async close() {
    console.info("Closing DB connection...");
    await this.client.end();
    await this.pool.end();
    console.info("DB connection closed");
  }
}
