import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';



class SessionController {
  async store(req, res) {
    const { email, password_hash } = req.body;


    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe.' });
    }

    const validatePassword = () => {
      return bcrypt.compare(password_hash, user.password_hash)
    }
    
    if (!validatePassword()){
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, name } = user;

    return res.json({
      token: jwt.sign({ id }, password_hash, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }),
    });
  }
}

export default new SessionController();