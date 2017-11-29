import { error } from 'util';

const express = require('express');
const app = express();

const morgan = require('morgan');
const errorHandler = require('./error-handler');
const cors = require('cors)()');

app.use(morgan('dev'));
app.use(cors);

//Question: is this necessary?
// app.use(express.static('./public'));

const categories = require('./routes/categories');

app.use('/api/categories', categories);

app.use(errorHandler);

module.exports = app;