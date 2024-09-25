
import bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import auth from './auth';
import jwt from 'jsonwebtoken'


export const tokenValidation = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(403).send('Token não fornecido.');
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, decoded) => { 
      if (err) {
          return res.status(401).send('Token inválido.');
      }
      

      req.userId = decoded.id; 
      next();
  });
};

