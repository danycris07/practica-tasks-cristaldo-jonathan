import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const getProfileByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe de ser tipo numerico entero")
    .bail()
    .custom(async (id) => {
      const perfilBuscado = await ProfileModel.findByPk(id);

      if (!perfilBuscado) {
        throw new Error("El perfil buscado no existe");
      }
      return true;
    }),
];

export const createProfileValidation = [
  body("userId")
    .notEmpty()
    .withMessage("Debe asignar un userId al perfil")
    .bail()
    .isInt()
    .withMessage("El userId debe ser de tipo numérico entero")
    .bail()
    .custom(async (userId) => {
      const usuarioExistente = await UserModel.findByPk(userId);

      if (!usuarioExistente) {
        throw new Error("El usuario asignado no existe");
      }

      const perfilExistente = await ProfileModel.findOne({
        where: { userId },
      });

      if (perfilExistente) {
        throw new Error("Este usuario ya tiene un perfil");
      }

      return true;
    }),

  body("bio")
    .optional()
    .isString()
    .withMessage("La bio debe ser de tipo string"),

  body("phone")
    .optional()
    .isString()
    .withMessage("El telefono debe ser de tipo string"),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser de tipo numérico entero")
    .bail()
    .custom(async (id) => {
      const perfilEncontrado = await ProfileModel.findByPk(id);

      if (!perfilEncontrado) {
        throw new Error("No existe ese perfil");
      }

      return true;
    }),

  body("bio")
    .optional()
    .isString()
    .withMessage("La bio debe ser de tipo string"),

  body("phone")
    .optional()
    .isString()
    .withMessage("El telefono debe ser de tipo string"),
];

export const deleteProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser de tipo numérico entero")
    .bail()
    .custom(async (id) => {
      const perfilEncontrado = await ProfileModel.findByPk(id);

      if (!perfilEncontrado) {
        throw new Error("No existe ese perfil");
      }

      return true;
    }),
];
