import { Router } from "express";

import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controller/user.controller.js";

import {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../../middlewares/validations/user.validations.js";
import { validate } from "../../middlewares/validate.js";

export const UserRouter = Router();

UserRouter.get("/", obtenerTodosLosUsuarios);
UserRouter.get("/:id", obtenerUsuarioPorId);
UserRouter.post("/", createUserValidation, validate, crearUsuario);
UserRouter.put("/:id", updateUserValidation, validate, actualizarUsuario);
UserRouter.delete("/:id", deleteUserValidation, validate, eliminarUsuario);
