import { Router } from "express";
import {
  obtenerTodosLosPerfiles,
  obtenerPerfilPorId,
  crearPerfil,
  actualizarPerfil,
  eliminarPerfil,
} from "../controller/profile.controller.js";

export const ProfileRouter = Router();

ProfileRouter.get("/", obtenerTodosLosPerfiles);
ProfileRouter.get("/:id", obtenerPerfilPorId);
ProfileRouter.post("/", crearPerfil);
ProfileRouter.put("/:id", actualizarPerfil);
ProfileRouter.delete("/:id", eliminarPerfil);
