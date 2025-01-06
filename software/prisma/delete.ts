import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    await prisma.$transaction([
      prisma.shoppingListItem.deleteMany(),
      prisma.masterShoppingListItem.deleteMany(),
      prisma.user.deleteMany(),
      prisma.shoppingList.deleteMany(),
      prisma.masterShoppingList.deleteMany(),
      prisma.category.deleteMany(),
      prisma.household.deleteMany(),
    ]);

    console.log("All data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
