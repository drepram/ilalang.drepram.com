const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Authors
  const author1 = await prisma.author.create({
    data: {
      name: 'Jane Doe',
      yearOfLife: '1980-2050',
      bio: 'A prolific modern poet',
      profilePicture: 'https://example.com/jane-doe.jpg',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'John Smith',
      yearOfLife: '1975-2055',
      bio: 'Renowned storyteller and novelist',
      profilePicture: 'https://example.com/john-smith.jpg',
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Williams',
      email: 'bob@example.com',
    },
  });

  // Create Posts
  await prisma.post.create({
    data: {
      type: 'poem',
      source: 'Original',
      title: 'Whispers of the Wind',
      content: 'Gentle breeze, secrets untold...',
      published: true,
      author: { connect: { id: author1.id } },
      user: { connect: { id: user1.id } },
    },
  });

  await prisma.post.create({
    data: {
      type: 'short story',
      source: 'Anthology: Modern Tales',
      title: 'The Forgotten Path',
      content: 'In the depths of the forest, a hidden trail beckoned...',
      published: true,
      author: { connect: { id: author2.id } },
      user: { connect: { id: user2.id } },
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });