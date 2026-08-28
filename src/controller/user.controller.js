import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";
import { matchedData } from "express-validator";

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuariosObtenidos = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: ["id", "title", "isComplete"],
        },
      ],
    });
    return res.status(200).json(usuariosObtenidos);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const usuarioEncontrado = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: ["id", "title", "isComplete"],
        },
      ],
    });
    return res.status(200).json(usuarioEncontrado);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await UserModel.create(dataLimpia);
    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);
    const usuarioBuscado = await UserModel.findByPk(id);

    await usuarioBuscado.update(dataLimpia);
    return res.status(200).json({ message: "Usuario actualizado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = matchedData(req);
    await UserModel.destroy({ where: { id } });

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
