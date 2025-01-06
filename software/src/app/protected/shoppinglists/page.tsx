import PageHeading from "@/components/page-heading";

import { fetchShoppingLists } from "@/lib/server/shopping-list/operations";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingList } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CirclePlus, Ellipsis, List, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ShoppingListStatus from "./shopping-list-status";
import { getUserRedirect } from "@/lib/server/auth/checkauth";
import ServerError from "@/lib/ServerError";

async function getShoppingLists(householdId: number): Promise<ShoppingList[]> {
  try {
    return await fetchShoppingLists(householdId);
  } catch (error) {
    if (error instanceof ServerError && error.statusCode === 404) return [];

    throw error;
  }
}

async function Page() {
  const user = await getUserRedirect();
  const shoppingLists = await getShoppingLists(user.householdId);

  return (
    <div className="space-y-5">
      <PageHeading>Shopping Lists</PageHeading>

      {shoppingLists.length === 0 ? (
        <p>You have no shopping lists. Please create one! 😉</p>
      ) : (
        <div className="space-y-2.5">
          <div className="flex justify-end">
            <Button variant="secondary">
              <CirclePlus />
              Create new
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableCaption className="sr-only">
                A list of your household's shopping lists
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {shoppingLists.map((list, index) => (
                  <TableRow key={list.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{list.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <ShoppingListStatus shoppingListId={list.id} />
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
                              className="hover:cursor-pointer"
                              asChild
                            >
                              <Link href={`/protected/shoppinglist/${list.id}`}>
                                <List />
                                Open
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer focus:bg-destructive">
                              <Trash2 />
                              Delete
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
