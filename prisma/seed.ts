import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.business.findUnique({
    where: { slug: "cafe-central" },
  });

  if (existing) {
    console.log("Seed data already exists, skipping.");
    return;
  }

  await prisma.business.create({
    data: {
      name: "Cafe Central",
      slug: "cafe-central",
      stampsNeeded: 10,
      rewardText: "1 cafe gratis!",
    },
  });

  console.log("Seed data created: Cafe Central (cafe-central)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
