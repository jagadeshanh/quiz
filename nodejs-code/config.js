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
};
