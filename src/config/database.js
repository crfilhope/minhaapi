require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  username: process.env.DB_, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,   
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}; 
