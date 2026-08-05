import { Router } from "express";

import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controller/user.controller.js";

export const UserRouter = Router();

UserRouter.get("/", obtenerTodosLosUsuarios);
UserRouter.get("/:id", obtenerUsuarioPorId);
UserRouter.post("/", crearUsuario);
UserRouter.put("/:id", actualizarUsuario);
UserRouter.delete("/:id", eliminarUsuario);
