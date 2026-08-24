import { Router } from "express";

import {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  actualizarTarea,
  crearTarea,
  eliminarTarea,
  asignarTagATarea,
} from "../controller/task.controller.js";

import {
  createTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
  asignTagTask,
} from "../../middlewares/validations/task.validations.js";
import { validate } from "../../middlewares/validate.js";

export const TaskRouter = Router();

TaskRouter.get("/", obtenerTodasLasTareas);
TaskRouter.post("/assign-tag", asignTagTask, validate, asignarTagATarea);
TaskRouter.post("/", createTaskValidation, validate, crearTarea);
TaskRouter.get("/:id", obtenerTareaPorId);
TaskRouter.put("/:id", updateTaskValidation, validate, actualizarTarea);
TaskRouter.delete("/:id", deleteTaskValidation, validate, eliminarTarea);
