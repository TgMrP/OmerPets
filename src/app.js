const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

require('dotenv').config({
  path: path.join(__dirname, 'config/config.env')
});

connectDB();

const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));

app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views/layouts/layout.ejs'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;