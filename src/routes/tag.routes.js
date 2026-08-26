import { Router } from "express";
import {
  obtenerTodosLosTags,
  obtenerTagPorId,
  crearTag,
  actualizarTag,
  eliminarTag,
} from "../controller/tag.controller.js";

import { validate } from "../middlewares/validate.js";
import {
  createTagValidation,
  updateTagValidation,
  deleteTagValidation,
  getTagByIdValidation,
} from "../middlewares/validations/tag.validations.js";
export const TagRouter = Router();

TagRouter.get("/", obtenerTodosLosTags);
TagRouter.get("/:id", getTagByIdValidation, validate, obtenerTagPorId);
TagRouter.post("/", createTagValidation, validate, crearTag);
TagRouter.put("/:id", updateTagValidation, validate, actualizarTag);
TagRouter.delete("/:id", deleteTagValidation, validate, eliminarTag);
