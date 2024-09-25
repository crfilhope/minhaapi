const { password } = require("../../config/database");

module.exports = {
   up (queryInterface, Sequelize) {
    
    return queryInterface.createTable('users',{
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tweet: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
    email: {
      type: Sequelize.DATE,
      allowNull:false,
      unique: true,
    },
    password_hash: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    check:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull:false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id'},
      onUptade: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false,
    }

  });
  },

   down: queryInterface =>{
    return queryInterface.dropTable('users');

    }, 
};
