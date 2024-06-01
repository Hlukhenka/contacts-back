/** @format */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactRouter = require('./routers/api/contact');


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", contactRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
