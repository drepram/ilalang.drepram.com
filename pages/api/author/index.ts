import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  // const authorId = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  // GET /api/author - Get all authors
  if (req.method === 'GET') {
    try {
      const result = await prisma.author.findMany();
      res.json(result);
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json({ error: "Error deleting author" });
    }
  // POST /api/author - Create a new author
  } else if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, profilePicture, yearOfLife, bio} = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  
    try {
      const result = await prisma.author.create({
        data: {
          name,
          profilePicture,
          yearOfLife,
          bio,
        },
      });
      res.json(result);
    } catch (error) {
      console.error("Error creating author:", error);
      res.status(500).json({ error: "Error creating author" });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}