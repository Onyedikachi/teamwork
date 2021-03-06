const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('Teamwork Backend Server Setup');
});

const apiRoutes = require('./router');

app.use('/api/v1', apiRoutes);

app.use((err, req, res, next) => {
  if (err.isBoom) {
    const { message } = err.data[0];
    res.status(err.output.statusCode).json({
      status: 'error',
      data: {
        message: message
      }
    });
  } else if (err.status === 404) {
    res.status(404).json({
      status: 'error',
      data: {
        message: 'Not Found'
      }
    });
  } else {
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Something Went Wrong'
      }
    });
  }
});

module.exports = app;
