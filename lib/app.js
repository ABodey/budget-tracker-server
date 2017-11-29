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
const categories = require('./routes/categories');
app.use('/api/categories', categories);


console.log('above line 23');

app.use(express.static('./public'));

// Redirect http to https in production
if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp);
}

// app.get('/*', function(req, res){
//     res.send('hello world');
// });

app.use(errorHandler);

module.exports = app;