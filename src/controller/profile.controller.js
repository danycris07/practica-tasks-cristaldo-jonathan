import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const obtenerTodosLosPerfiles = async (req, res) => {
  try {
    const perfilesObtenidos = await ProfileModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(perfilesObtenidos);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerPerfilPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const perfilEncontrado = await ProfileModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(perfilEncontrado);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearPerfil = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await ProfileModel.create(dataLimpia);
    return res.status(201).json({ message: "Perfil creado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarPerfil = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const perfilBuscado = await ProfileModel.findByPk(id);
    await perfilBuscado.update(dataLimpia);
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarPerfil = async (req, res) => {
  try {
    const { id } = matchedData(req);

    await ProfileModel.destroy({ where: { id } });

    return res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
