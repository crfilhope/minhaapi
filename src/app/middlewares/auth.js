import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { promisify } from 'util';
import { jwtDecode } from "jwt-decode";
require('dotenv').config();

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });

    
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, process.env.TOKEN_SECRET);
    
    req.userId = decoded.id; 

    

    

    return next();
  } catch (error) {
    
    console.log(error);
    
    return res.status(401).json({ error: 'Token inválido' });
  }
};
