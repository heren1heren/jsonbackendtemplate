const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();
async function main() { // populate database
 await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}


class Book {
  async getBooks(filters) {
    return await prisma.book.findMany({ where: filters });
  }

  async getBookById(id) {
    return await prisma.book.findUnique({ where: { id } });
  }

  async createBook(data) {
    return await prisma.book.create({ data });
  }

  async updateBook(id, data) {
    return await prisma.book.update({ where: { id }, data });
  }

  async deleteBook(id) {
    return await prisma.book.delete({ where: { id } });
  }

  async getBookAuthors(id) {
    return await prisma.book.findUnique({
      where: { id },
      include: { authors: true },
    });
  }

  async getBookGenres(id) {
    return await prisma.book.findUnique({
      where: { id },
      include: { genres: true },
    });
  }
}

export default new Book();
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });