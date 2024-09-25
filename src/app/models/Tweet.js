import Sequelize, { Model } from 'sequelize';

class Tweet extends Model {
  static init(sequelize) {
    super.init(
      {
        tweet: {
          type: Sequelize.STRING,
          allowNull: false, 
        },
        check: {
          type: Sequelize.BOOLEAN,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false, 
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Tweet;
