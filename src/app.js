const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const app = express();

// Secure App
const whitelist = ['http://google.com'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(xss());

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests'
});

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

app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(hpp());

app.get('/', (req, res) => {
  res.status(200).send('Teamwork Backend Server Setup');
});

const apiRoutes = require('./router');

app.use('/api/v1', apiRoutes, limit);

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
