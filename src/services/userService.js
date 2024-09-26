import User from '../models/User';

class UserService {
  async store({ data }) {
    const novoUser = await User.create(data);
    const { id, name, email } = novoUser;

    return { id, name, email };
  }

  async index() {
    const users = await User.findAll({
      attributes: ['id', 'name', 'userId', 'email'],
      order: [['id', 'ASC']],
    });

    return users;
  }

  async show({ userId }) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const { id, name, email } = user;

    return { id, name, email, userId: userId }; 
  }

  async update({ data, filter }) {
    const user = await User.findByPk(filter.userId);
    if (!user) {
      throw new Error('Usuário não existe');
    }

    const novosDados = await user.update(data);
    const { id, name, email } = novosDados;

    return { id, name, email, userId: filter.userId }; 
  }

  async delete({ userId }) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não existe');
    }
    await user.destroy();

    return { msg: 'Usuário apagado.' };
  }
}

export default new UserService();
