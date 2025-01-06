import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import CreateItemForm from "./create-item-form";
import { getCategories } from "@/lib/server/category/operations";
import { DialogDescription } from "@radix-ui/react-dialog";

type CreateItemDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  shoppingListId: number;
};

function CreateItemDialog({
  isOpen,
  setIsOpen,
  shoppingListId,
}: CreateItemDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>

        <DialogDescription hidden>
          Fill in the form below to add an item to the shopping list.
        </DialogDescription>

        <CreateItemForm shoppingListId={shoppingListId} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateItemDialog;
