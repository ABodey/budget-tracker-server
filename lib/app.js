const express = require('express');
const app = express();

const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();

const errorHandler = require('./error-handler');
const cors = require('cors')();
const checkDB = require('./checkDB')();

app.use(morgan('dev'));
app.use(cors);
app.use(express.json());


app.use(checkDB);
app.use(express.static('./public'));

const categories = require('./routes/categories');
app.use('/api', categories);

app.use(errorHandler());

// Redirect http to https in production
if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp);
}


module.exports = app;