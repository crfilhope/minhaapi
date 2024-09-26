import { Op } from 'sequelize';
import User from '../app/models/User';
import jwt from 'jsonwebtoken';

class TokenService{
    async store({ data }){
        const { auth = '', password_hash = '' } = data;

        if(!auth || !password_hash){
            throw new Error('Credenciais invalidas');
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: auth},
                ]
            },
            attributes: ['id', 'email', 'password_hash']
        });

        if(!user){
            throw new Error('Usuário nao existe')
        }

        if(!(await user.isPasswordValid(password_hash))){
            throw new Error('password_hash invalida')
        }

        const { id, email } = user;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });

        return token;
    }
}

export default new TokenService();