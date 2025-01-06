import { ShoppingList } from "@prisma/client";

export type ShoppingListWithItems = {
  shoppingListItem: {
    category: {
      id: number;
      householdId: number;
      description: string;
    };
    id: number;
    description: string;
    isPurchased: boolean;
    quantity: number;
    categoryId: number;
    shoppingListId: number;
  }[];
} & ShoppingList;
