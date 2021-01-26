const express = require('express');
const cookie_parser = require('cookie-parser');

const app = express();
app.use(cookie_parser('1234'));
