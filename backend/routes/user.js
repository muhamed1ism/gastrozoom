import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/all", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        role: true,
      },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.put("/role/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role,
      },
    });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error updating user role" });
  }
});

export default router;