import { body, param } from "express-validator";
import { UserModel } from "../../src/models/user.model";

export const createUserValidation = [
  body("name")
    .isString()
    .withMessage("El nombre debe de ser tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El nombre no debe tener mas de 100 caracteres"),

  body("email")
    .isString()
    .withMessage("El email debe ser de tipo string")
    .trim()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .bail()
    .isEmail()
    .withMessage("El email debe tener formato email")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El email no debe tener mas de 100 caracteres")
    .bail()
    .custom(async (email) => {
      const usuarioConEmailExistente = await UserModel.findOne({
        where: { email },
      });

      if (usuarioConEmailExistente) {
        throw new Error("El email ya esta registrado con un usuario");
      }
      return true;
    }),

  body("password")
    .isString()
    .withMessage("La contraseña debe de ser tipo string")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .bail()
    .isLength({ max: 100 })
    .withMessage("La contraseña no debe tener mas de 100 caracteres"),
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe de ser tipo numerico entero")
    .bail()
    .notEmpty()
    .withMessage("El campo id no debe estar vacio")
    .bail()
    .custom(async (id) => {
      const usuarioEncontrado = await UserModel.findByPk(id);

      if (!usuarioEncontrado) {
        throw new Error("No existe el usuario a actualizar");
      }
      return true;
    }),

  body("name")
    .isString()
    .withMessage("El nombre debe de ser tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres"),

  body("email")
    .isString()
    .withMessage("El email debe de ser tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .bail()
    .isEmail()
    .withMessage("Debe tener formato tipo Email")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El email no debe superar los 100 caracteres")
    .bail()
    .custom(async (email, { req }) => {
      const emailBuscado = await UserModel.findOne({ where: { email } });
      const idUsuario = Number(req.params.id);

      if (emailBuscado && emailBuscado.id !== idUsuario) {
        throw new Error("El email ya existe");
      }
      return true;
    }),

  body("password")
    .isString()
    .withMessage("La contraseña debe ser de tipo string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ max: 100 })
    .withMessage("La contraseña no debe tener mas de 100 caracteres"),
];

export const deleteUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe de ser tipo numerico entero")
    .bail()
    .custom(async (id) => {
      const usuarioBuscado = await UserModel.findByPk(id);

      if (!usuarioBuscado) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),
];
