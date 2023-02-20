const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  db_user: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  jwt_token: process.env.TOKEN_SECRET,
  jwt_expries_in: process.env.TOKEN_EXPIRES_IN,
  mail_host: process.env.MAIL_HOST,
  mail_port: process.env.MAIL_PORT,
  mail_username: process.env.MAIL_USERNAME,
  mail_password: process.env.MAIL_PASSWORD,
};
