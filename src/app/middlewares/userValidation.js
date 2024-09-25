import User from "../models/User";
import { loginSchema } from "./Schema";

const loginValidation = async (req, res, next) => {
  const validation = await loginSchema.validate(req.body)
  console.log(validation)

  if (!validation) {
    return res.status(401).json({ error: 'Usuario não existe.' });
  }
  next()
} 


export {loginValidation}