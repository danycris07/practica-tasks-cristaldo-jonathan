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
    if (!perfilEncontrado) {
      return res.status(404).json({ message: "El perfil no existe" });
    }
    return res.status(200).json(perfilEncontrado);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearPerfil = async (req, res) => {
  try {
    const { bio, phone, userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Debe asignar un userId al perfil" });
    }

    const usuarioExistente = await UserModel.findByPk(userId);
    if (!usuarioExistente) {
      return res.status(404).json({ message: "El usuario asignado no existe" });
    }

    const perfilExistente = await ProfileModel.findOne({ where: { userId } });
    if (perfilExistente) {
      return res
        .status(400)
        .json({ message: "Este usuario ya tiene un perfil" });
    }

    if (bio !== undefined) {
      if (typeof bio !== "string") {
        return res
          .status(400)
          .json({ message: "La bio debe ser de tipo string" });
      }
    }

    if (phone !== undefined) {
      if (typeof phone !== "string") {
        return res
          .status(400)
          .json({ message: "El telefono debe ser de tipo string" });
      }
    }

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

    if (!perfilBuscado) {
      return res.status(404).json({ message: "No existe ese perfil" });
    }

    if (bio !== undefined) {
      if (typeof bio !== "string") {
        return res
          .status(400)
          .json({ message: "La bio debe ser de tipo string" });
      }
    }

    if (phone !== undefined) {
      if (typeof phone !== "string") {
        return res
          .status(400)
          .json({ message: "El telefono debe ser de tipo string" });
      }
    }

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
    const perfilEncontrado = await ProfileModel.findByPk(id);

    if (!perfilEncontrado) {
      return res.status(404).json({ message: "No existe ese perfil" });
    }

    await perfilEncontrado.destroy();
    return res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
