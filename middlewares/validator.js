import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.json({ errors: resultado.mapped() });
  }
  next();
};
