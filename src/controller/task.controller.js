import { TaskModel } from "../models/task.model.js";

export const obtenerTodasLasTareas = async (req, res) => {
  try {
    const tareasObtenidas = await TaskModel.findAll();
    return res.status(200).json(tareasObtenidas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEncontrada = await TaskModel.findByPk(id);
    if (!tareaEncontrada) {
      return res.status(404).json({ message: "La tarea no existe" });
    }
    return res.status(200).json(tareaEncontrada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const crearTarea = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      title.length > 100
    ) {
      return res.status(400).json({
        message:
          "La tarea debe ser de tipo caracteres, no vacia y menor a 100 caracteres",
      });
    }

    const tituloBuscado = await TaskModel.findOne({ where: { title } });

    if (tituloBuscado) {
      return res.status(400).json({ message: "El titulo ya existe" });
    }

    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message:
          "La descripcion debe ser de tipo caracteres, no vacia y menor a 100 caracteres",
      });
    }

    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "Tarea completada debe ser de tipo boolean (true o false)",
      });
    }

    await TaskModel.create({ title, description, isComplete });
    return res.status(201).json({ message: "Tarea creada con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const tareaBuscada = await TaskModel.findByPk(id);

    if (!tareaBuscada) {
      return res.status(404).json({ message: "No existe esa tarea" });
    }
    await tareaBuscada.update({ title, description, isComplete });
    return res.status(200).json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEncontrada = await TaskModel.findByPk(id);

    if (!tareaEncontrada) {
      return res.status(404).json({ message: "No existe esa tarea" });
    }

    await tareaEncontrada.destroy();

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
