import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {

    if (req.method === 'GET') {
        // GET /api/author/:id/posts - Get all posts by a specific author
        try {
            const { id: authorId } = req.query;
            const result = await prisma.post.findMany({
                where: {
                    authorId
                },
                include: {
                    author: true
                }
            });

            res.status(201).json(result);
        } catch (error) {
            console.error("Error retrieving posts by author:", error);
            res.status(500).json({ error: "Error retrieving posts by author" });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}