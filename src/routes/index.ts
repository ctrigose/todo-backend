import express from "express";
import { DB } from "../db";
import { Controller } from "./controller";

/** Defines API routes and links them to the appropriate controller fn */
export const newRouter = (deps: { db: DB }) => {
  const controller = new Controller(deps);

  const router = express.Router();

  router.get(`/all`, controller.GET_ALL);
  router.get(`/id/:id`, controller.GET_BY_ID);

  router.post(`/add`, controller.ADD);
  router.post(`/add`, controller.ADD);

  router.put(`/rename/:id`, controller.RENAME_BY_ID);
  router.put(`/setAsCompleted/:id`, controller.SET_AS_COMPLETED);
  router.put(`/setAsNotCompleted/:id`, controller.SET_AS_NOT_COMPLETED);

  router.delete(`/delete/:id`, controller.DELETE);

  return router;
};
