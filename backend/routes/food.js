const express = require('express');
const prisma = require('../config/prisma');
const router = express.Router();

// create new food
router.post('/create', async function(req, res) {
  const { name, description, price, category, imageUrl } = req.body;

  if (name.trim() === '' || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newFood = await prisma.food.create({
      data: {
        name,
        description: description || '',
        price,
        category: category || 'GLAVNO_JELO',
        imageUrl: imageUrl || ''
      },
    });

    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: 'Creating food failed' });
  }
});

// get all foods
router.get('/all', async function(req, res) {
  try {
    const foods = await prisma.food.findMany();

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Fetching foods failed' });
  }
});

// get food by id
router.get('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    const food = await prisma.food.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Fetching food failed' });
  }
});

// update food by id
router.put('/:id', async function(req, res) {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedFood = await prisma.food.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price,
        category,
      },
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: 'Updating food failed' });
  }
});

// delete food by id
router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Deleting food failed' });
  }
});

module.exports = router;