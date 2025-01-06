import { PrismaClient, type ShoppingListItem, type ShoppingList } from "@prisma/client";
import ServerError from "../../ServerError";

const prisma = new PrismaClient();

/**
 * Get all of a household's shopping lists.
 *
 * @param householdId The id of the household.
 * @returns An array of shopping lists.
 */
export const fetchShoppingLists = async (householdId: number): Promise<ShoppingList[]> => {
  try {
    const shoppingLists: ShoppingList[] = await prisma.shoppingList.findMany({
      where: {
        householdId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (shoppingLists.length === 0) {
      throw new ServerError(`The household with id: ${householdId} has no shopping lists`, 404);
    }

    return shoppingLists;
  } catch (error) {
    console.error("❌ " + error);

    if (error instanceof ServerError) {
      throw error;
    }

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Fetch the status of a shopping list.
 *
 * @param shoppingListId The id of the shopping list.
 * @returns "complete" is all items have been purchased; "inprogress" if there are items that have not been purchased; "empty" if the shopping list contains no tasks.
 */
export const fetchShoppingListStatus = async (
  shoppingListId: number
): Promise<"complete" | "inprogress" | "empty"> => {
  try {
    // Get shopping list items.
    const shoppingListItems: ShoppingListItem[] = await prisma.shoppingListItem.findMany({
      where: {
        shoppingListId,
      },
    });

    if (shoppingListItems.length === 0) {
      return "empty";
    }

    // Check if all items have been purchased.
    return shoppingListItems.every(({ isPurchased }) => isPurchased) ? "complete" : "inprogress";
  } catch (error) {
    console.error("❌ " + error);

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Fetch a shopping list and all the items it contains. Each item also includes the category it belongs to. Items are sorted by category description.
 *
 * @param shoppingListId The id of the shopping list.
 * @returns A shopping list, it's items, and each item's category.
 */
export const fetchShoppingList = async (shoppingListId: number) => {
  try {
    const shoppingList = await prisma.shoppingList.findUnique({
      where: {
        id: shoppingListId,
      },
      include: {
        shoppingListItem: {
          include: {
            category: true,
          },
          orderBy: {
            category: {
              description: "asc",
            },
          },
        },
      },
    });

    if (shoppingList === null) {
      throw new ServerError(`Shopping list with id ${shoppingListId} does not exist`, 404);
    }

    return shoppingList;
  } catch (error) {
    console.error("❌ " + error);

    if (error instanceof ServerError) {
      throw error;
    }

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};
