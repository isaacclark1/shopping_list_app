import CategoryIcon from "@/components/category-icon";
import PageHeading from "@/components/page-heading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchShoppingList } from "@/lib/server/shopping-list/operations";
import Quantity from "./quantity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Status from "./status";
import DeleteItemMenuButton from "./delete-item-menu-button";
import AddItemButton from "./add-item-button";
import { getUserRedirect } from "@/lib/server/auth/checkauth";
import ServerError from "@/lib/ServerError";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getShoppingList = async (shoppingListId: number) => {
  try {
    const [user, shoppingList] = await Promise.all([
      // Check user is authorised to access the requested shopping list.
      getUserRedirect(),
      fetchShoppingList(shoppingListId),
    ]);

    if (user.householdId !== shoppingList.householdId) {
      throw new ServerError("Not authorised", 401);
    }

    return { user, shoppingList };
  } catch (error) {
    console.error("❌ " + error);

    throw error;
  }
};

async function Page({ params }: PageProps) {
  const { id } = await params;
  const { shoppingList } = await getShoppingList(Number.parseInt(id));

  return (
    <div className="space-y-5">
      <PageHeading>
        Shopping List
        <span className="text-muted-foreground">
          {" - " + new Date(shoppingList.createdAt).toLocaleDateString("en-GB")}
        </span>
      </PageHeading>

      {shoppingList.shoppingListItem.length === 0 ? (
        <p>The shopping list is empty. Add an item! 😉</p>
      ) : (
        <div className="space-y-2.5">
          <div className="flex justify-end">
            <AddItemButton shoppingListId={shoppingList.id} />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableCaption className="sr-only">
                A list of the shopping list's items
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="pl-5">Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shoppingList.shoppingListItem.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <div className="items-center justify-center inline-flex gap-2">
                        <div className="text-muted-foreground [&_svg]:size-4">
                          <CategoryIcon category={item.category.description} />
                        </div>
                        {item.category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Quantity initialValue={item.quantity} itemId={item.id} />
                    </TableCell>
                    <TableCell>
                      <Status
                        itemId={item.id}
                        initialPurchaseStatus={item.isPurchased}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              asChild
                              className="focus:bg-destructive/90 hover:cursor-pointer"
                            >
                              <DeleteItemMenuButton itemId={item.id} />
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
