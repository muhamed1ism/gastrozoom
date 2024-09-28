const express = require('express');
const prisma = require('../config/prisma');
const router = express.Router();

// Get all messages
router.get('/all', async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Fetching messages failed' });
  }
});

// Get message by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const message = await prisma.message.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Fetching message failed' });
  }
});

// Create a new system message
router.post('/create', async (req, res) => {
  const { userId, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        userId,
        message,
        type: 'SYSTEM_NOTIFICATION',
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Creating message failed' });
  }
});

// Update message by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { message, type } = req.body;
  try {
    const updatedMessage = await prisma.message.update({
      where: { id: Number(id) },
      data: { message, type },
    });
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Updating message failed' });
  }
});

// Delete message by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deleting message failed' });
  }
});

module.exports = router;