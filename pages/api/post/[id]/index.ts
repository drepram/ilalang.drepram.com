import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      return getPost(postId, res);
    case "PUT":
      return updatePost(postId, req, res, session);
    case "DELETE":
      return deletePost(postId, res, session);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

async function getPost(postId, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: { select: { name: true } } },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Error fetching post" });
  }
}

async function updatePost(postId, req, res, session) {
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, content, published, authorId } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content, published, authorId },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
}

async function deletePost(postId, res, session) {
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
}
