import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const company = await prisma.company.upsert({
    where: { id: "seed-company" },
    create: { id: "seed-company", name: "Agencia Demo" },
    update: {},
  });

  const passwordHash = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "planner@demo.test" },
    create: {
      email: "planner@demo.test",
      name: "Planner Demo",
      role: "PLANNER",
      passwordHash,
      companyId: company.id,
    },
    update: {},
  });

  const wedding = await prisma.wedding.upsert({
    where: { slug: "mi-boda" },
    create: {
      name: "Boda Demo",
      coupleName: "Alex & Sam",
      slug: "mi-boda",
      companyId: company.id,
      location: "Riviera Maya",
    },
    update: {},
  });

  console.log({ company, user: { email: user.email }, wedding: { slug: wedding.slug } });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

