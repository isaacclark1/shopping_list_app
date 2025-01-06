import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const clarkHousehold = await prisma.household.create({
    data: {
      name: "Clark",
    },
  });

  const oCallaghanHousehold = await prisma.household.create({
    data: {
      name: "O'Callaghan",
    },
  });

  await prisma.user.create({
    data: {
      householdId: clarkHousehold.id,
      firstName: "Isaac",
      lastName: "Clark",
      username: "isaacclark",
      password: await bcrypt.hash("password", 10),
      role: "admin",
    },
  });

  await prisma.user.create({
    data: {
      householdId: clarkHousehold.id,
      firstName: "Dominic",
      lastName: "Clark",
      username: "domclark",
      password: await bcrypt.hash("password", 10),
    },
  });

  await prisma.user.create({
    data: {
      householdId: clarkHousehold.id,
      firstName: "David",
      lastName: "Clark",
      username: "davidclark",
      password: "password",
    },
  });

  await prisma.user.create({
    data: {
      householdId: oCallaghanHousehold.id,
      firstName: "Ruauri",
      lastName: "O'Callaghan",
      username: "ruairi",
      password: "password",
    },
  });

  await prisma.user.create({
    data: {
      householdId: oCallaghanHousehold.id,
      firstName: "Zoe",
      lastName: "Clark",
      username: "zoeclark",
      password: "password",
    },
  });

  const bakery = await prisma.category.create({
    data: {
      description: "Bakery",
      householdId: clarkHousehold.id,
    },
  });

  const veg = await prisma.category.create({
    data: {
      description: "Vegetables",
      householdId: clarkHousehold.id,
    },
  });

  const fruit = await prisma.category.create({
    data: {
      description: "Fruit",
      householdId: clarkHousehold.id,
    },
  });

  const meat = await prisma.category.create({
    data: {
      description: "Meat",
      householdId: oCallaghanHousehold.id,
    },
  });

  const cheese = await prisma.category.create({
    data: {
      description: "Cheese",
      householdId: oCallaghanHousehold.id,
    },
  });

  const cakes = await prisma.category.create({
    data: {
      description: "Cakes",
      householdId: oCallaghanHousehold.id,
    },
  });

  await prisma.masterShoppingList.create({
    data: {
      householdId: oCallaghanHousehold.id,
      masterShoppingListItem: {
        create: [
          { description: "Whole chicken", categoryId: meat.id },
          { description: "Sirloin steaks", categoryId: meat.id },
          { description: "Brie", categoryId: cheese.id },
          { description: "Chocolate brownies", categoryId: cakes.id },
          { description: "Angel cakes", categoryId: cakes.id },
        ],
      },
    },
  });

  await prisma.masterShoppingList.create({
    data: {
      householdId: clarkHousehold.id,
      masterShoppingListItem: {
        create: [
          { description: "Brown bread", categoryId: bakery.id },
          { description: "Brocolli", categoryId: veg.id },
          { description: "Carrots", categoryId: veg.id },
          { description: "Cabbage", categoryId: veg.id },
          { description: "Apples", categoryId: fruit.id },
        ],
      },
    },
  });

  await prisma.shoppingList.create({
    data: {
      householdId: oCallaghanHousehold.id,
      shoppingListItem: {
        create: [
          { description: "Whole chicken", categoryId: meat.id, quantity: 5 },
          { description: "Sirloin steaks", categoryId: meat.id, quantity: 10 },
          { description: "Brie", categoryId: cheese.id },
          {
            description: "Chocolate brownies",
            categoryId: cakes.id,
            quantity: 8,
          },
          { description: "Angel cakes", categoryId: cakes.id, quantity: 4 },
        ],
      },
    },
  });

  await prisma.shoppingList.create({
    data: {
      householdId: clarkHousehold.id,
      shoppingListItem: {
        create: [
          { description: "Brown bread", categoryId: bakery.id },
          { description: "Brocolli", categoryId: veg.id, quantity: 3 },
          { description: "Carrots", categoryId: veg.id, quantity: 20 },
          { description: "Cabbage", categoryId: veg.id },
          { description: "Apples", categoryId: fruit.id, quantity: 6 },
        ],
      },
    },
  });

  console.info("✅ Database seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
