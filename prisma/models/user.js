// create a query class demo
import bcrypt from 'bcryptjs';
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

 class User {
  async getUsers(filters) {
    return await prisma.user.findMany({ where: filters });
  }
  async getUserByUserName(name) {
    return await prisma.user.findUnique({ where: { username: name } });
}

  async getUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async createUser(data) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // username field is unknown 

// model User {
//   id      Int      @id @default(autoincrement())
//   email   String   @unique
//   name    String?  
//   username String?  @unique
//   password String 
//   posts   Post[]
//   profile Profile?
// }
    return await prisma.user.create({data : { ...data, password:hashedPassword }});
  }

  async updateUser(id, data) {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }

  
}

export default new User() ;