import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error publishing post:", error);
    res.status(500).json({ error: "Error publishing post" });
  }
}
