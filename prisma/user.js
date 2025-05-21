// create a query class demo
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

class User {
  async getUsers(filters) {
    return await prisma.user.findMany({ where: filters });
  }

  async getUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async createUser(data) {
    return await prisma.user.create({ data });
  }

  async updateUser(id, data) {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }

  
}

export default new User();