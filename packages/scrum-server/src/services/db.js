require('dotenv').config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const DBConnection = require('mongoose');
const { Logger } = require('../utils/Logger');

const logger = Logger(__filename);

DBConnection.connect(
  `mongodb+srv://${db_user}:${db_pass}@${db_url}/${db_name}?retryWrites=true&w=majority`
)
  .then(() => logger.info(`Connected to ${db_url}`))
  .catch(err => logger.error(err));

module.exports = { DBConnection };
