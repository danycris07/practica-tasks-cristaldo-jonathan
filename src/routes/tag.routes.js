import { Router } from "express";
import {
  obtenerTodosLosTags,
  obtenerTagPorId,
  crearTag,
  actualizarTag,
  eliminarTag,
} from "../controller/tag.controller.js";

export const TagRouter = Router();

TagRouter.get("/", obtenerTodosLosTags);
TagRouter.get("/:id", obtenerTagPorId);
TagRouter.post("/", crearTag);
TagRouter.put("/:id", actualizarTag);
TagRouter.delete("/:id", eliminarTag);
