require('dotenv').config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;

const DBConnection = require('mongoose');

// mongodb+srv://mongoUser:<password>@cluster0.2fgfs.mongodb.net/<dbname>?retryWrites=true&w=majority
//DBConnection.connect(`mongodb://${db_user}:${db_pass}@${db_url}/${db_name}`)
DBConnection.connect(`mongodb+srv://${db_user}:${db_pass}@${db_url}/${db_name}?retryWrites=true&w=majority`)
  .then(() => console.log(`Connected to ${db_url}`))
  .catch(err => console.log(err));

module.exports = { DBConnection };
