import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";
export const obtenerTodasLasTareas = async (req, res) => {
  try {
    const tareasObtenidas = await TaskModel.findAll({
      include: [{
        model: UserModel,
        attributes: ['id', 'name', 'email'] 
      }]
    });
    return res.status(200).json(tareasObtenidas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEncontrada = await TaskModel.findByPk(id, {
      include: [{
        model: UserModel,
        attributes: ['id', 'name', 'email'] 
      }]
    });
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
    const { title, description, isComplete, userId} = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Debe asignar un userId a la tarea" });
    }
    
    const usuarioExistente = await UserModel.findByPk(userId);
    if (!usuarioExistente) {
      return res.status(404).json({ message: "El usuario asignado no existe" });
    }

    if (typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "El titulo debe ser de tipo caracter (string)" });
    }
    if (title.trim() === "") {
      return res.status(400).json({ message: "El titulo no debe estar vacio" });
    }
    if (title.length > 100) {
      return res.status(400).json({
        message: "El titulo debe ser menor a 100 caracteres",
      });
    }

    const tituloBuscado = await TaskModel.findOne({ where: { title } });

    if (tituloBuscado) {
      return res.status(400).json({ message: "El titulo ya existe" });
    }

    if (typeof description !== "string") {
      return res
        .status(400)
        .json({ message: "La descripcion debe ser de tipo caracter (string)" });
    }
    if (description.trim() === "") {
      return res
        .status(400)
        .json({ message: "La descripcion no debe estar vacia" });
    }
    if (description.length > 100) {
      return res.status(400).json({
        message: "La descripcion debe ser menor a 100 caracteres",
      });
    }

    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "Tarea completada debe ser de tipo boolean (true / false)",
      });
    }

    await TaskModel.create({ title, description, isComplete, userId});
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

    if (title !== undefined) {
      if (typeof title !== "string") {
        return res
          .status(400)
          .json({ message: "El titulo debe ser de tipo caracter (string)" });
      }
      if (title.trim() === "") {
        return res
          .status(400)
          .json({ message: "El titulo no debe estar vacio" });
      }
      if (title.length > 100) {
        return res.status(400).json({
          message: "El titulo debe ser menor a 100 caracteres",
        });
      }

      if (title !== tareaBuscada.title) {
        const tituloBuscado = await TaskModel.findOne({ where: { title } });

        if (tituloBuscado) {
          return res.status(400).json({ message: "El titulo ya existe" });
        }
      }
    }
    if (description !== undefined) {
      if (typeof description !== "string") {
        return res
          .status(400)
          .json({
            message: "La descripcion debe ser de tipo caracter (string)",
          });
      }
      if (description.trim() === "") {
        return res
          .status(400)
          .json({ message: "La descripcion no debe estar vacia" });
      }
      if (description.length > 100) {
        return res.status(400).json({
          message: "La descripcion debe ser menor a 100 caracteres",
        });
      }
    }

    if (isComplete !== undefined) {
      if (typeof isComplete !== "boolean") {
        return res.status(400).json({
          message: "Tarea completada debe ser de tipo boolean (true / false)",
        });
      }
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



export const asignarTagATarea = async (req, res) => {
  try {
    const { taskId, tagId } = req.body;
    
    const tarea = await TaskModel.findByPk(taskId);
    const tag = await TagModel.findByPk(tagId);

    if (!tarea || !tag) {
      return res.status(404).json({ message: "La tarea o el tag no existen" }); 
    }

   
    await tarea.addTag(tag); 
    

    return res.status(200).json({ message: "Tag asignado a la tarea correctamente" }); 
  } catch (error) {

    return res.status(500).json({ message: "Error en el servidor" }); 
  }
};