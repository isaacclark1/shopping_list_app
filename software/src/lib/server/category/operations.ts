import ServerError from "@/lib/ServerError";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (
  householdId: number
): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        householdId,
      },
    });

    return categories;
  } catch (error) {
    console.error("❌ " + error);

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};
