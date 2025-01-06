"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmRemoveItemDialog from "./confirm-remove-item-dialog";

type DeleteItemMenuButtonProps = {
  itemId: number;
};

function DeleteItemMenuButton({ itemId }: DeleteItemMenuButtonProps) {
  const [isRemoveItemDialogOpen, setIsRemoveItemDialogOpen] = useState(false);

  const openRemoveItemDialog = () => setIsRemoveItemDialogOpen(true);

  const handleClick = () => openRemoveItemDialog();

  return (
    <>
      {isRemoveItemDialogOpen && (
        <ConfirmRemoveItemDialog
          open={isRemoveItemDialogOpen}
          setOpen={setIsRemoveItemDialogOpen}
          itemId={itemId}
        />
      )}

      <Button
        variant="destructive"
        className="w-full justify-start"
        onClick={handleClick}
      >
        <Trash2 />
        Delete
      </Button>
    </>
  );
}

export default DeleteItemMenuButton;
