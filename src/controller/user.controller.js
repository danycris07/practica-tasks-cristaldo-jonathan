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
    const { id, name, email, password } = req.body;
  
    await usuarioBuscado.update({ name, email, password });
    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await UserModel.findByPk(id);

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "No existe ese usuario" });
    }

    await usuarioEncontrado.destroy();

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
