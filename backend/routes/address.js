import express from "express";
import prisma from "../config/prisma.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// create new address
router.post('/create', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {address, addressNumber, floorNumber, isSelectedOnDoor} = req.body;
  let {isPrimary} = req.body;

  if (!userId || !address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  const primaryExists = await prisma.address.findFirst({
    where: {
      userId,
      isPrimary: true,
    },
  });

  if (isPrimary === false && primaryExists === null) {
    isPrimary = true;
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
        isSelectedOnDoor,
        isPrimary,
      },
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Creating address failed' });
  }
});

// get all addresses
router.get('/all', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching addresses' });
  }
});

// get address with isPrimary true
router.get('/primary', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const address = await prisma.address.findFirst({
      where: {
        userId,
        isPrimary: true,
      },
    });

    res.status(200).json(address);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching primary address' });
  }
});

// get address by id
router.get('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {id} = req.params;

  try {
    const address = await prisma.address.findUnique({
      where: {
        userId,
        id: Number(id),
      },
    });

    res.status(200).json(address);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching address' });
  }
});

// update address by id
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {id} = req.params;
  const {address, addressNumber, floorNumber, isPrimary, isSelectedOnDoor } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const updatedAddress = await prisma.address.update({
      where: {
        userId,
        id: Number(id),
      },
      data: {
        address,
        addressNumber,
        floorNumber,
        isSelectedOnDoor,
        isPrimary,
      },
    });

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error updating address' });
  }
});

// delete address by id
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {id} = req.params;

  try {
    await prisma.address.delete({
      where: {
        userId,
        id: Number(id),
      },
    });

    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error deleting address' });
  }
});

export default router;