const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

module.exports = app;
