import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";

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
    const { id } = req.params;
    const usuarioEncontrado = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: ["id", "title", "isComplete"],
        },
      ],
    });
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    return res.status(200).json(usuarioEncontrado);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await UserModel.create({ name, email, password });
    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const usuarioBuscado = await UserModel.findByPk(id);

    await usuarioBuscado.update({ name, email, password });
    return res.status(200).json({ message: "Usuario actualizado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await UserModel.findByPk(id);

    await usuarioEncontrado.destroy();

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
