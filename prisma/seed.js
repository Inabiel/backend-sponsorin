const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  const hash = bcrypt.hash("password", 10);
  const manyUser = await prisma.user.create({
    data: {
      nama: "Nabil",
      email: "Nizzullah@gmail.com",
      noTelpon: "0895367831730",
      password: hash,
      rolesId: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
