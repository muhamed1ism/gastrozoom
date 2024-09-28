const express = require('express');
const prisma = require('./config/prisma');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const foodRouter = require('./routes/food');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/food', foodRouter);

const PORT = 4000;

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server radi na http://localhost:${PORT}`);
    })
  } catch (error) {
    console.error('Greška u pokretanju servera:', error);
  }
}

start();

module.exports = app;
