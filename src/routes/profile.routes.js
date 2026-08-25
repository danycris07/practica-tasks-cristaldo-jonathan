import { Router } from "express";
import {
  obtenerTodosLosPerfiles,
  obtenerPerfilPorId,
  crearPerfil,
  actualizarPerfil,
  eliminarPerfil,
} from "../controller/profile.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  updateProfileValidation,
  createProfileValidation,
  deleteProfileValidation,
} from "../../middlewares/validations/profile.validations.js";

export const ProfileRouter = Router();

ProfileRouter.get("/", obtenerTodosLosPerfiles);
ProfileRouter.get("/:id", obtenerPerfilPorId);
ProfileRouter.post("/", createProfileValidation, validate, crearPerfil);
ProfileRouter.put("/:id", updateProfileValidation, validate, actualizarPerfil);
ProfileRouter.delete("/:id", deleteProfileValidation, validate, eliminarPerfil);
