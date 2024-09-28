const express = require('express');
const prisma = require('../config/prisma');
const router = express.Router();

// create new address
router.post('/create', async function(req, res) {
  const { userId, address, addressNumber, floorNumber, isPrimary } = req.body;

  if (!userId || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAddress = await prisma.address.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        address,
        addressNumber,
        floorNumber,
        isPrimary: isPrimary || false,
      },
    });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: 'Creating address failed' });
  }
});

// get all addresses
router.get('/all', async function(req, res) {
  try {
    const addresses = await prisma.address.findMany();

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Fetching addresses failed' });
  }
});

// get address by id
router.get('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    const address = await prisma.address.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Fetching address failed' });
  }
});

// update address by id
router.put('/:id', async function(req, res) {
  const { id } = req.params;
  const { address, addressNumber, floorNumber, isPrimary } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const updatedAddress = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: {
        address,
        addressNumber,
        floorNumber,
        isPrimary: isPrimary || false,
      },
    });

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Updating address failed' });
  }
});

// delete address by id
router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    await prisma.address.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deleting address failed' });
  }
});