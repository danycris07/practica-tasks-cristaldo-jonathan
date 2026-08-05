import { Router } from "express";

import {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  actualizarTarea,
  crearTarea,
  eliminarTarea,
} from "../controller/task.controller.js";

export const TaskRouter = Router();

TaskRouter.get("/", obtenerTodasLasTareas);
TaskRouter.get("/:id", obtenerTareaPorId);
TaskRouter.post("/", crearTarea);
TaskRouter.put("/:id", actualizarTarea);
TaskRouter.delete("/:id", eliminarTarea);
