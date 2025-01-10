"use client";

import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { CircleMinus, CirclePlus, Divide, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmRemoveItemDialog from "./confirm-remove-item-dialog";
import { useToast } from "@/hooks/use-toast";

type QuantityProps = {
  initialValue: number;
  itemId: number;
};

export function Quantity({ initialValue, itemId }: QuantityProps) {
  const [value, setValue] = useState<number>(initialValue);

  const { data, loading, error, fetchData } = useFetch<{
    status: number;
    quantity: number;
  }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppinglist/item/${itemId}`);

  const changeQuantity = fetchData;
  const changeQuantityResponseData = data;
  const isChangeQuantityRequestLoading = loading;
  const changeQuantityError = error;

  const [isRemoveItemDialogOpen, setIsRemoveItemDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    changeQuantityError &&
      toast({
        title: "An error ocurred while updating the item's quantity.",
      });
  }, [changeQuantityError]);

  useEffect(() => {
    if (changeQuantityResponseData !== null) {
      setValue(changeQuantityResponseData.quantity);
    }
  }, [changeQuantityResponseData]);

  const handleDecrementButtonClick = () => {
    if (isChangeQuantityRequestLoading) return;

    if (value === 1) {
      handleRemoveLastItem();
      return;
    }

    changeQuantity({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attribute: "quantity",
        data: {
          operation: "decrement",
        },
      }),
    });

    if (changeQuantityError) {
      console.error(changeQuantityError);
    }
  };

  const handleRemoveLastItem = () => {
    setIsRemoveItemDialogOpen(true);
  };

  const handleIncrementButtonClick = () => {
    if (isChangeQuantityRequestLoading) return;

    changeQuantity({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attribute: "quantity",
        data: {
          operation: "increment",
        },
      }),
    });

    if (changeQuantityError) {
      console.log(changeQuantityError);
    }
  };

  return (
    <>
      {isRemoveItemDialogOpen && (
        <ConfirmRemoveItemDialog
          open={isRemoveItemDialogOpen}
          setOpen={setIsRemoveItemDialogOpen}
          itemId={itemId}
        />
      )}

      <div className="inline-flex justify-center gap-2 items-center">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent h-max w-max"
          onClick={handleDecrementButtonClick}
        >
          <CircleMinus />
        </Button>
        {(loading && (
          <div className="h-5 flex items-center">
            <LoaderCircle className="size-4 animate-spin" />
          </div>
        )) ||
          (value !== null && value)}
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent h-max w-max"
          onClick={handleIncrementButtonClick}
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  );
}

export default Quantity;
