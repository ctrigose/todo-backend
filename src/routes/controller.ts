import { RequestHandler } from "express";
import { DB } from "../db/index";
import { dataConstraints } from "../constants";
import { NewTodo } from "../types";
import { isValidString, validateId } from "./validation";
import { BadRequestError, NotFoundError } from "../util/errors";

/** Handles express requests using db class */
export class Controller {
  db: DB;

  constructor(deps: { db: DB }) {
    this.db = deps.db;
  }

  GET_ALL: RequestHandler = async (req, res) => {
    const result = await this.db.getAll();
    res.status(200).send(result.rows);
  };

  GET_BY_ID: RequestHandler = async (req, res) => {
    const parsedId = validateId(req.params.id);
    const result = await this.db.getById(parsedId);
    if (!result.rows.length)
      throw new NotFoundError(`No todos found with ID ${parsedId}`);

    res.status(200).send(result.rows[0]);
  };

  ADD: RequestHandler = async (req, res) => {
    const { name } = req.body;
    if (!name) throw new BadRequestError("Request is missing name param");
    if (isValidString(name, dataConstraints.todo.name)) {
      const todo: NewTodo = {
        name,
        completed: false,
      };
      const result = await this.db.add(todo);
      res.status(200).send(result.rows);
    } else {
      throw new BadRequestError("Invalid todo name");
    }
  };

  RENAME_BY_ID: RequestHandler = async (req, res) => {
    const parsedId = validateId(req.params.id);
    const result = await this.db.getById(parsedId);
    if (!result.rows.length)
      throw new NotFoundError(`No todos found with ID ${parsedId}`);

    const { name } = req.body;
    if (!name) throw new BadRequestError("Request is missing name param");

    if (isValidString(name, dataConstraints.todo.name)) {
      await this.db.renameById(parsedId, { name });
      res.status(200).send({ message: "Updated successfully" });
    } else {
      throw new BadRequestError("Invalid todo name");
    }
  };

  SET_AS_COMPLETED: RequestHandler = async (req, res) => {
    const parsedId = validateId(req.params.id);
    const result = await this.db.getById(parsedId);
    if (!result.rows.length)
      throw new NotFoundError(`No todos found with ID ${parsedId}`);

    await this.db.setAsCompletedById(parsedId);
    res.status(200).send({ message: "Updated successfully" });
  };

  SET_AS_NOT_COMPLETED: RequestHandler = async (req, res) => {
    const parsedId = validateId(req.params.id);
    const result = await this.db.getById(parsedId);
    if (!result.rows.length)
      throw new NotFoundError(`No todos found with ID ${parsedId}`);

    await this.db.setAsNotCompletedById(parsedId);
    res.status(200).send({ message: "Updated successfully" });
  };

  DELETE: RequestHandler = async (req, res) => {
    const parsedId = validateId(req.params.id);
    const result = await this.db.getById(parsedId);
    if (!result.rows.length)
      throw new NotFoundError(`No todos found with ID ${parsedId}`);

    await this.db.deleteById(parsedId);
    res.status(200).send({ message: "Deleted successfully" });
  };
}
