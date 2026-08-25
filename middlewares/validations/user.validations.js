import { body } from "express-validator";
import { UserModel } from "../../src/models/user.model";

export const createUserValidation = [
    body("name")
    .isString().withMessage("El nombre debe de ser tipo string")
    .bail()
    .trim()
    .notEmpty().withMessage("El nombre no debe estar vacio")
    .bail()
    .isLength({max: 100}).withMessage("El nombre no debe tener mas de 100 caracteres"),


    body("email")
    .isString().withMessage("El email debe ser de tipo string")
    .trim()
    .notEmpty().withMessage("El email no debe estar vacio")
    .bail()
    .isEmail().withMessage("El email debe tener formato email")
    .bail()
    .isLength({max: 100}).withMessage("El email no debe tener mas de 100 caracteres")
    .bail()git
    .custom(async(email)=>{
        const usuarioConEmailExistente = await UserModel.findOne({where: {email}})

        if(usuarioConEmailExistente){
            throw new Error("El email ya esta registrado con un usuario")
        }
        return true
    }),


    body("password")
    .isString().withMessage("La contraseña debe de ser tipo string")
    .trim()
    .notEmpty().withMessage("La contraseña no debe estar vacia")
    .bail()
    .isLength({max: 100}).withMessage("La contraseña no debe tener mas de 100 caracteres")


]