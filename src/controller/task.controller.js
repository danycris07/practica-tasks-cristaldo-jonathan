import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const obtenerTodasLasTareas = async (req, res) => {
  try {
    const tareasObtenidas = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(tareasObtenidas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const tareaEncontrada = await TaskModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(tareaEncontrada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const dataLimpia = matchedData(req);

    await TaskModel.create(dataLimpia);
    return res.status(201).json({ message: "Tarea creada con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarTarea = async (req, res) => {
  try {
    const { id, ...dataLimpia } = matchedData(req);

    const tareaBuscada = await TaskModel.findByPk(id);
    await tareaBuscada.update(dataLimpia);
    return res.status(200).json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const { id } = matchedData(req);

    await TaskModel.destroy({ where: { id } });

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const asignarTagATarea = async (req, res) => {
  try {
    const { taskId, tagId } = matchedData(req);

    const tarea = await TaskModel.findByPk(taskId);
    const tag = await TagModel.findByPk(tagId);

    await tarea.addTag(tag);

    return res
      .status(200)
      .json({ message: "Tag asignado a la tarea correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
