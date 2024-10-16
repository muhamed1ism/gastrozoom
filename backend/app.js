import express from 'express';
import prisma from './config/prisma.js';
import logger from 'morgan';
import cors from 'cors';

import authRouter from './routes/auth.js';
import foodRouter from './routes/food.js';
import addressRouter from './routes/address.js';
import orderRouter from './routes/order.js';
import messageRouter from './routes/message.js';
import userRouter from './routes/user.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/food', foodRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);

const PORT = 4000;

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`The server is running at http://localhost:${PORT}`);
    })
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

start();
