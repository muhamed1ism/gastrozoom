import express from "express";
import prisma from "../config/prisma.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";

const router = express.Router();

// Get all messages
router.get('/all', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const messages = await prisma.message.findMany({
      where: { userId  },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Get message by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const message = await prisma.message.findUnique({
      where: {
        userId,
        id: Number(id)
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error fetching message' });
  }
});

// Create a new system message
router.post('/create', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Message title and text are required' });
  }

  try {
    const users = await prisma.user.findMany({
      select: { id: true },
    });

    const newMessage = await prisma.$transaction(
      users.map(user => prisma.message.create({
        data: {
          userId: user.id,
          title,
          text,
          type: 'SYSTEM_NOTIFICATION',
        },
      }))
    );

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Creating message failed' });
  }
});

// Delete message by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    await prisma.message.delete({
      where: {
        userId,
        id: Number(id)
      },
    });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error deleting message' });
  }
});

export default router;