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
    const { id } = req.params;
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
    const { bio, phone, userId } = req.body;

    await ProfileModel.create({ bio, phone, userId });
    return res.status(201).json({ message: "Perfil creado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, phone } = req.body;

    const perfilBuscado = await ProfileModel.findByPk(id);
    await perfilBuscado.update({ bio, phone });
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    await ProfileModel.findByPk(id);

    return res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
