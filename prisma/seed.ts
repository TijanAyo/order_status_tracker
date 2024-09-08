import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Generate dummy data
    const orders = Array.from({ length: 100 }).map(() => ({
      customer_name: faker.person.fullName(),
      status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    }));

    // Insert dummy info into the database
    for (const order of orders) {
      await prisma.order.create({
        data: order,
      });
    }

    console.log("Seeding complete.");
  } catch (e) {
    console.error(`Error while seeding`, e.message, e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
