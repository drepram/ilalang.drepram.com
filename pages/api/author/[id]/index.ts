import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const authorId = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  // PUT /api/author/:id - Update an author
  if (req.method === "PUT") {
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, profilePicture, yearOfLife, bio, description } = req.body;
    try {
      const result = await prisma.author.update({
        where: { id: authorId },
        data: {
          name,
          profilePicture,
          yearOfLife,
          bio,
          description
        },
      });
      res.json(result);
    } catch (error) {
      console.error("Error updating author:", error);
      res.status(500).json({ error: "Error updating author" });
    }
    // DELETE /api/author/:id - Delete an author
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      await prisma.author.delete({
        where: { id: authorId },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json({ error: "Error deleting author" });
    }
    // GET /api/author/:id - Get a specific author profile
  } else if (req.method === "GET") {
    try {
      const result = await prisma.author.findUnique({
        where: { id: authorId },
      });
      res.json(result);
    } catch (error) {
      console.error("Error getting author:", error);
      res.status(500).json({ error: "Error getting author" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
