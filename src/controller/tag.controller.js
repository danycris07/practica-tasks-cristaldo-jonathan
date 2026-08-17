import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";

export const obtenerTodosLosTags = async (req, res) => {
  try {
    const tagsObtenidos = await TagModel.findAll({
      include: [
        {
          model: TaskModel,
          attributes: ["id", "title", "isComplete"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(tagsObtenidos);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerTagPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tagEncontrado = await TagModel.findByPk(id, {
      include: [
        {
          model: TaskModel,
          attributes: ["id", "title", "isComplete"],
          through: { attributes: [] },
        },
      ],
    });
    if (!tagEncontrado) {
      return res.status(404).json({ message: "El tag no existe" });
    }
    return res.status(200).json(tagEncontrado);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "El nombre debe ser de tipo string" });
    }
    if (name.trim() === "") {
      return res.status(400).json({ message: "El nombre no debe estar vacio" });
    }

    const tagExistente = await TagModel.findOne({ where: { name } });
    if (tagExistente) {
      return res.status(400).json({ message: "El nombre del tag ya existe" });
    }

    await TagModel.create({ name });
    return res.status(201).json({ message: "Tag creado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tagBuscado = await TagModel.findByPk(id);

    if (!tagBuscado) {
      return res.status(404).json({ message: "No existe ese tag" });
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        return res
          .status(400)
          .json({ message: "El nombre debe ser de tipo string" });
      }
      if (name.trim() === "") {
        return res
          .status(400)
          .json({ message: "El nombre no debe estar vacio" });
      }
      if (name !== tagBuscado.name) {
        const tagExistente = await TagModel.findOne({ where: { name } });
        if (tagExistente) {
          return res
            .status(400)
            .json({ message: "El nombre del tag ya existe" });
        }
      }
    }

    await tagBuscado.update({ name });
    return res.status(200).json({ message: "Tag actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tagEncontrado = await TagModel.findByPk(id);

    if (!tagEncontrado) {
      return res.status(404).json({ message: "No existe ese tag" });
    }

    await tagEncontrado.destroy();
    return res.status(200).json({ message: "Tag eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
