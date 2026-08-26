import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const getTagByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe de ser tipo numerico entero")
    .bail()
    .custom(async (id) => {
      const tagBuscado = await TagModel.findByPk(id);

      if (!tagBuscado) {
        throw new Error("La etiqueta buscada no existe");
      }
      return true;
    }),
];

export const createTagValidation = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser de tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacío")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres")
    .bail()
    .custom(async (name) => {
      const tagExistente = await TagModel.findOne({
        where: { name },
      });

      if (tagExistente) {
        throw new Error("El nombre del tag ya existe");
      }

      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser de tipo numérico entero")
    .bail()
    .custom(async (id) => {
      const tagEncontrado = await TagModel.findByPk(id);

      if (!tagEncontrado) {
        throw new Error("No existe ese tag");
      }

      return true;
    }),

  body("name")
    .isString()
    .withMessage("El nombre debe ser de tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacío")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres")
    .bail()
    .custom(async (name, { req }) => {
      const tagExistente = await TagModel.findOne({
        where: { name },
      });

      const idTag = Number(req.params.id);

      if (tagExistente && tagExistente.id !== idTag) {
        throw new Error("El nombre del tag ya existe");
      }

      return true;
    }),
];

export const deleteTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser de tipo numérico entero")
    .bail()
    .custom(async (id) => {
      const tagEncontrado = await TagModel.findByPk(id);

      if (!tagEncontrado) {
        throw new Error("No existe ese tag");
      }

      return true;
    }),
];
