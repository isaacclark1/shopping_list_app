import { PrismaClient, ShoppingListItem } from "@prisma/client";
import ServerError from "../../ServerError";

const prisma = new PrismaClient();

/**
 * Increments or decrements a shopping list item's quantity.
 *
 * @param itemId The id of the shopping list item.
 * @param operation The operation to perform: either "increment" or "decrement".
 * @returns The updated quantity of the item.
 * @throws A server error if the database query fails.
 */
export const changeQuantity = async (
  itemId: number,
  operation: "increment" | "decrement"
): Promise<number> => {
  let updatedItem: ShoppingListItem;

  try {
    if (operation === "increment") {
      updatedItem = await prisma.shoppingListItem.update({
        where: {
          id: itemId,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      updatedItem = await prisma.shoppingListItem.update({
        where: {
          id: itemId,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
    }

    return updatedItem.quantity;
  } catch (error) {
    console.error("❌ " + error);

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Deletes a shopping list item.
 *
 * @param itemId The id of the item to delete.
 * @throws A server error if the database query fails.
 */
export const deleteItem = async (itemId: number): Promise<void> => {
  try {
    await prisma.shoppingListItem.delete({
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    console.error("❌ " + error);

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Change the isPurchased status of a shopping list item.
 *
 * @param itemId The id of the shopping list item.
 * @param currentStatus The current status.
 * @returns The new isPurchased status.
 */
export const changeIsPurchasedStatus = async (
  itemId: number,
  currentStatus: boolean
): Promise<boolean> => {
  try {
    const shoppingListItem = await prisma.shoppingListItem.update({
      where: {
        id: itemId,
      },
      data: {
        isPurchased: !currentStatus,
      },
    });

    // Get new status
    const { isPurchased } = shoppingListItem;

    return isPurchased;
  } catch (error) {
    console.error("❌ " + error);

    throw new ServerError("Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
};
