import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return createPost(req, res, session);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: { author: { select: { name: true } } },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
}

async function createPost(req, res, session) {
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, content, author } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: author,
          },
        },
        user: { connect: { id: session.user.id } },
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
}
