const express = require('express');
const prisma = require('../config/prisma');
const router = express.Router();

// create new order
router.post('/create', async function(req, res) {
  const { userId, foodId, quantity } = req.body;

  if (!userId || !foodId || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        food: {
          connect: {
            id: foodId,
          },
        },
        quantity,
      },
    });

    await prisma.message.create({
      data: {
        userId,
        message: `Your order ${newOrder.id} has been created`,
        type: 'ORDER_CREATED',
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Creating order failed' });
  }
});

// get all orders
router.get('/all', async function(req, res) {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Fetching orders failed' });
  }
});

// get order by id
router.get('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Fetching order failed' });
  }
});

// update order by id
router.put('/:id', async function(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    await prisma.message.create({
      data: {
        userId: updatedOrder.userId,
        message: `Your order ${updatedOrder.id} has been updated to ${status}`,
        type: `ORDER_${status}`,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Updating order failed' });
  }
});

