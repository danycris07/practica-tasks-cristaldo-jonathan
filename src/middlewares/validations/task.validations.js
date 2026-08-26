import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { TaskModel } from "../../models/task.model.js";
import { TagModel } from "../../models/tag.model.js";

export const getTaskByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe de ser tipo numerico entero")
    .bail()
    .custom(async (id) => {
      const tareaBuscada = await TaskModel.findByPk(id);

      if (!tareaBuscada) {
        throw new Error("No existe la tarea buscada");
      }
      return true;
    }),
];

export const createTaskValidation = [
  body("userId")
    .notEmpty()
    .withMessage("Se debe asignar un userId a la tarea")
    .bail()
    .isInt()
    .withMessage("Debe ser de tipo entero")
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

export const updateTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe ingresar el id de la tarea a actualizar")
    .bail()
    .isInt()
    .withMessage("El id debe de ser tipo entero")
    .bail()
    .custom(async (id) => {
      const tareaBuscada = await TaskModel.findByPk(id);

      if (!tareaBuscada) {
        throw new Error("No existe esa tarea");
      }
      return true;
    }),

  body("title")
    .optional()
    .isString()
    .withMessage("El titulo debe de ser tipo string")
    .trim()
    .notEmpty()
    .withMessage("El titulo no debe estar vacio")
    .isLength({ max: 100 })
    .withMessage("El titulo no debe tener mas de 100 caracteres")
    .bail()
    .custom(async (title, { req }) => {
      const tituloBuscado = await TaskModel.findOne({ where: { title } });
      const idTarea = Number(req.params.id);
      if (tituloBuscado && tituloBuscado.id !== idTarea) {
        throw new Error("El titulo ya existe");
      }
      return true;
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("La descripcion debe de ser tipo string")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no debe de estar vacia")
    .isLength({ max: 100 })
    .withMessage("La descripcion no debe superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("Completada debe de ser tipo booleano (TRUE o FALSE)"),
];

export const asignTagTask = [
  body("taskId")
    .notEmpty()
    .withMessage("El taskId no debe de estar vacio")
    .bail()
    .isInt()
    .withMessage("El taskId debe de ser tipo integer")
    .bail()
    .custom(async (taskId) => {
      const tareaBuscada = await TaskModel.findByPk(taskId);

      if (!tareaBuscada) {
        throw new Error("La tarea buscada no existe");
      }
      return true;
    }),

  body("tagId")
    .notEmpty()
    .withMessage("El tagId no debe estar vacio")
    .bail()
    .isInt()
    .withMessage("El tagId debe de ser tipo integer")
    .bail()
    .custom(async (tagId) => {
      const tagBuscada = await TagModel.findByPk(tagId);

      if (!tagBuscada) {
        throw new Error("La etiqueta buscada no es valida");
      }
      return true;
    }),
];

export const deleteTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe ingresar el id de la tarea")
    .bail()
    .isInt()
    .withMessage("El id debe ser de tipo entero")
    .bail()
    .custom(async (id) => {
      const tarea = await TaskModel.findByPk(id);

      if (!tarea) {
        throw new Error("No existe esa tarea");
      }

      return true;
    }),
];
