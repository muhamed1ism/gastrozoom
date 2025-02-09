import express from "express";
import prisma from "../config/prisma.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";
import authorizeWorker from "../middleware/authorizeWorker.js";

const router = express.Router();

// create new order
router.post('/create', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {basketItems, addressId, deliveryPrice} = req.body;

  if (!userId || !basketItems || !addressId || !deliveryPrice) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    let totalPrice = deliveryPrice;
    const orderItemsData = [];

    for (const foodItem of basketItems) {
      const food = await prisma.food.findUnique({
        where: {
          id: Number(foodItem.foodId),
        },
      });

      if (!food) {
        return res.status(404).json({ error: `Food with id ${foodItem.foodId} not found` });
      }

      const quantity = foodItem.quantity;
      const itemTotalPrice = food.price * quantity;
      totalPrice += itemTotalPrice;

      orderItemsData.push({
        foodId: food.id,
        foodName: food.name,
        foodPrice: food.price,
        quantity,
        totalPrice: itemTotalPrice,
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        user: {
          connect: {id: userId},
        },
        addressId: addressId,
        address: address.address,
        addressNumber: address.addressNumber,
        floorNumber: address.floorNumber,
        totalPrice,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// get all orders
router.get('/all', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({

      
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// get all user orders
router.get('/user-all', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// get order by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

router.get('/:id/items', async (req, res) => {
  const { id } = req.params;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: Number(id),
      },
    });

    res.status(200).json(orderItems);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching order items' });
  }
});

// update order by id
router.put('/:id', authenticateToken, authorizeWorker, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
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

    const translatedStatus = () => {
      switch (status) {
        case 'ACCEPTED':
          return 'accepted';
        case 'REJECTED':
          return 'rejected';
        case 'IN_DELIVERY':
          return 'in delivery';
        case 'DELIVERED':
          return 'delivered';
        default:
          return '';
      }
    }

    await prisma.message.create({
      data: {
        userId: updatedOrder.userId,
        title: 'Order status update',
        text: `Your order ${updatedOrder.id} is ${translatedStatus()}`,
        type: `ORDER_${status}`,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Updating order failed' });
  }
});

export default router;