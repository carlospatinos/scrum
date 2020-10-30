const path = require('path');
require('dotenv').config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;

let DBConnection = require('mongoose');

DBConnection.connect(`mongodb://${db_user}:${db_pass}@${db_url}/${db_name}`)
.then(() => console.log(`Connected to ${db_url}`))
.catch((err)=> console.log(err));

module.exports = { DBConnection }