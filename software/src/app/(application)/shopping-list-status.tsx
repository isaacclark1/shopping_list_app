import { fetchShoppingListStatus } from "@/lib/server/shopping-list/operations";
import { Circle, CircleCheckBig, Timer } from "lucide-react";

type ShoppingListStatusProps = {
  shoppingListId: number;
};

async function ShoppingListStatus({
  shoppingListId,
}: ShoppingListStatusProps): Promise<JSX.Element> {
  const status = await fetchShoppingListStatus(shoppingListId);

  if (status === "complete") {
    return (
      <div className="inline-flex items-center justify-center [&_svg]:size-4 gap-2">
        <CircleCheckBig className="text-muted-foreground" />
        All items purchased
      </div>
    );
  } else if (status === "inprogress") {
    return (
      <div className="inline-flex items-center justify-center [&_svg]:size-4 gap-2">
        <Timer className="text-muted-foreground" />
        Items still to purchase
      </div>
    );
  }

  // Status is "empty"
  return (
    <div className="inline-flex items-center justify-center [&_svg]:size-4 gap-2">
      <Circle className="text-muted-foreground" />
      The shopping list is empty
    </div>
  );
}

export default ShoppingListStatus;
