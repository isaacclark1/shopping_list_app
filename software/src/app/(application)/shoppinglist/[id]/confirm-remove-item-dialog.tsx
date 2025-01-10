"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect } from "react";

type ConfirmRemoveItemDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
};

function ConfirmRemoveItemDialog({
  open,
  setOpen,
  itemId,
}: ConfirmRemoveItemDialogProps) {
  const router = useRouter();

  const { data, loading, error, fetchData } = useFetch<{
    status: number;
    message?: string;
  }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppinglist/item/${itemId}`, {
    method: "DELETE",
  });

  const deleteItemResponseData = data;
  const isDeleteItemRequestLoading = loading;
  const deleteItemRequestError = error;
  const deleteItem = fetchData;

  const { toast } = useToast();

  useEffect(() => {
    if (deleteItemResponseData && deleteItemResponseData.status === 200) {
      close();

      router.refresh();
    }
  }, [deleteItemResponseData]);

  useEffect(() => {
    deleteItemRequestError &&
      toast({
        title: "An error occurred while deleting the item.",
      });
  }, [deleteItemRequestError]);

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    deleteItem();

    if (deleteItemRequestError) {
      console.error(deleteItemRequestError);
    }
  };

  const close = () => setOpen(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            from the shopping list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={(event) => handleActionClick(event)}
          >
            <Button
              variant="destructive"
              className="bg-destructive hover:bg-destructive/90 text-foreground"
            >
              Yes, delete item{" "}
              {isDeleteItemRequestLoading && (
                <LoaderCircle className="animate-spin size-4" />
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmRemoveItemDialog;
