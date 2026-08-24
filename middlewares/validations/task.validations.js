import { body } from "express-validator";
import { UserModel } from "../../src/models/user.model.js";
import { TaskModel } from "../../src/models/task.model.js";

export const createTaskValidation = [
  body("userId")
    .isInt()
    .withMessage("Debe ser de tipo entero")
    .notEmpty()
    .withMessage("Se debe asignar un userId a la tarea")
    .bail()
    .custom(async (userId) => {
      const usuarioExistente = await UserModel.findByPk(userId);

      if (!usuarioExistente) {
        throw new Error("El usuario asignado no existe");
      }

      return true;
    }),

  body("title")
    .isString()
    .withMessage("El titulo debe de ser tipo string")
    .trim()
    .notEmpty()
    .withMessage("El titulo no debe estar vacio")
    .isLength({ max: 100 })
    .withMessage("El titulo no debe tener mas de 100 caracteres")
    .custom(async (title) => {
      const tituloBuscado = await TaskModel.findOne({ where: { title } });
      if (tituloBuscado) {
        throw new Error("El titulo ya existe");
      }
      return true;
    }),

  body("description")
    .isString()
    .withMessage("La descripcion debe de ser tipo string")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no debe de estar vacia")
    .isLength({ max: 100 })
    .withMessage("La descripcion no debe de tener mas de 100 caracteres"),

  body("isComplete")
    .exists()
    .withMessage("Completada es obligatoria")
    .isBoolean()
    .withMessage("Completada debe de ser tipo booleano (TRUE o FALSE)"),
];
