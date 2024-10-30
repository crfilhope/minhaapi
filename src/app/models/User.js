import Sequelize, { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              args: true,
              msg: 'Email inválido',
            },
          },
        },
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: true,
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 e 50 caracteres',
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    );
    this.addHook('beforeSave', async (user) => {
      
      if (user.password_hash) {
        user.password_hash = await bcrypt.hash(user.password_hash, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Tweet, { foreignKey: 'user_id', as: 'tweet' });
  }
}
export default User;
