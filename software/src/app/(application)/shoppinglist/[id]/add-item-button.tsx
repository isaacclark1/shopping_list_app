"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import CreateItemDialog from "./create-item-dialog";

type AddItemButtonProps = {
  shoppingListId: number;
};

function AddItemButton({ shoppingListId }: AddItemButtonProps) {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  const openAddItemDialog = () => setIsAddItemDialogOpen(true);

  const handleClick = () => openAddItemDialog();

  return (
    <>
      {isAddItemDialogOpen && (
        <CreateItemDialog
          isOpen={isAddItemDialogOpen}
          setIsOpen={setIsAddItemDialogOpen}
          shoppingListId={shoppingListId}
        />
      )}

      <Button variant="secondary" onClick={handleClick}>
        <CirclePlus />
        Add item
      </Button>
    </>
  );
}

export default AddItemButton;
