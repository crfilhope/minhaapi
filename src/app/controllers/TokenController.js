import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


class TokenController {
  async store(req, res) {
    const { email = '', password_hash = '' } = req.body;


    if (!email || !password_hash) {
      return res.status(401).json({
        erros: ['Credenciais inválidas'],
      });
    }


    const user = await User.findOne({ where: { email } });


    if (!user) {
      return res.status(401).json({
        erros: ['Usuário não existe'],
      });
    }



    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        erros: ['Senha inválida'],
      });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}


export default new TokenController();
