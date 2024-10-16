import express from 'express';
import prisma from '../config/prisma.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import upload from '../middleware/upload.js';
import uploadImageToImgbb from '../utils/imgbb.js';

const router = express.Router();

// create new food
router.post('/create', authenticateToken, authorizeAdmin, upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file;

  if (name.trim() === '' || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToImgbb(image.buffer);
    }


    const newFood = await prisma.food.create({
      data: {
        name,
        description: description || '',
        price: Number(price),
        category: category || 'MAIN_DISH',
        imageUrl: imageUrl || ''
      },
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Creating food failed' });
  }
});

// get all foods
router.get('/all', async (req, res) => {
  try {
    const foods = await prisma.food.findMany();

    res.status(200).json(foods);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Fetching foods failed' });
  }
});

// get food by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const food = await prisma.food.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(food);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Fetching food failed' });
  }
});

// update food by id
router.put('/:id', authenticateToken, authorizeAdmin, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const image = req.file;

  if (!name || !price || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToImgbb(image.buffer);
    }

    const updatedFood = await prisma.food.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price: Number(price),
        category,
        ...(imageUrl && { imageUrl }),
      },
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Updating food failed' });
  }
});

// delete food by id
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Deleting food failed' });
  }
});

export default router;