import { UserModel } from "../models/user.model.js";

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuariosObtenidos = await UserModel.findAll();
    return res.status(200).json(usuariosObtenidos);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await UserModel.findByPk(id);
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
    if (typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "El nombre debe de ser de tipo caracter (string)" });
    }
    if (name.trim() === "") {
      return res.status(400).json({ message: "El nombre no debe estar vacio" });
    }

    if (name.length > 100) {
      return res.status(400).json({
        message: "El nombre debe ser  menor a 100 caracteres",
      });
    }

    if (typeof email !== "string") {
      return res
        .status(400)
        .json({ message: "El email debe de ser de tipo caracter(string)" });
    }
    if (email.trim() === "") {
      return res.status(400).json({ message: "El email no debe estar vacio" });
    }
    if (email.length > 100) {
      return res.status(400).json({
        message: "El email debe ser menor a 100 caracteres",
      });
    }

    const usuarioExistente = await UserModel.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya existe" });
    }

    if (typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "La contraseña debe ser de tipo caracter (string)" });
    }
    if (password.trim() === "") {
      return res
        .status(400)
        .json({ message: "La contraseña no debe estar vacia" });
    }
    if (password.length > 100) {
      return res.status(400).json({
        message: "La contraseña no debe ser mayor de 100 caracteres",
      });
    }

    await UserModel.create({ id, name, email, password });
    return res.status(201).json({ message: "Usuario creado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const usuarioBuscado = await UserModel.findByPk(id);

    if (!usuarioBuscado) {
      return res.status(404).json({ message: "No existe ese usuario" });
    }
    if (name !== undefined) {
      if (typeof name !== "string") {
        return res
          .status(400)
          .json({ message: "El nombre debe de ser de tipo caracter (string)" });
      }
      if (name.trim() === "") {
        return res
          .status(400)
          .json({ message: "El nombre no debe estar vacio" });
      }

      if (name.length > 100) {
        return res.status(400).json({
          message: "El nombre debe ser  menor a 100 caracteres",
        });
      }
    }

    if (email !== undefined) {
    if (typeof email !== "string") {
      return res
        .status(400)
        .json({ message: "El email debe de ser de tipo caracter(string)" });
    }
    if (email.trim() === "") {
      return res.status(400).json({ message: "El email no debe estar vacio" });
    }
    if (email.length > 100) {
      return res.status(400).json({
        message: "El email debe ser menor a 100 caracteres",
      });
    }

    if (email !== usuarioBuscado.email) {
        const usuarioExistente = await UserModel.findOne({ where: { email } });
        if (usuarioExistente) {
          return res.status(400).json({ message: "El email ya existe" });
        }
      }
    }

   

if (password !== undefined) {
    if (typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "La contraseña debe ser de tipo caracter (string)" });
    }
    if (password.trim() === "") {
      return res
        .status(400)
        .json({ message: "La contraseña no debe estar vacia" });
    }
    
    if (password.length > 100) {
      return res.status(400).json({
        message: "La contraseña no debe ser mayor de 100 caracteres",
      });
    }
  }

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
