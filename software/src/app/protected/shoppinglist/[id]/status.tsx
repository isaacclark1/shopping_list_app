"use client";

import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, SquareCheck, SquareX } from "lucide-react";
import { useEffect, useState } from "react";

type PurchaseStatusProps = {
  itemId: number;
  initialPurchaseStatus: boolean;
};

function Status({ initialPurchaseStatus, itemId }: PurchaseStatusProps) {
  const [purchaseStatus, setPurchaseStatus] = useState<boolean>(
    initialPurchaseStatus
  );

  const { data, loading, error, fetchData } = useFetch<{
    status: number;
    newStatus: boolean;
  }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppinglist/item/${itemId}`);

  const changeIsPurchasedResponseData = data;
  const isChangeIsPurchasedRequestLoading = loading;
  const changeIsPurchasedError = error;
  const changeIsPurchased = fetchData;

  useEffect(() => {
    if (changeIsPurchasedResponseData !== null) {
      setPurchaseStatus(changeIsPurchasedResponseData.newStatus);
    }
  }, [changeIsPurchasedResponseData]);

  const { toast } = useToast();

  useEffect(() => {
    changeIsPurchasedError &&
      toast({
        title: "An error occurred while changing the status of the item.",
      });
  }, [changeIsPurchasedError]);

  const handleClick = (): void => {
    if (isChangeIsPurchasedRequestLoading) return;

    changeIsPurchased({
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attribute: "isPurchased",
        data: {
          currentStatus: purchaseStatus,
        },
      }),
    });
  };

  if (isChangeIsPurchasedRequestLoading) {
    return (
      <Button disabled className="min-w-40">
        <LoaderCircle className="animate-spin" />
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleClick}
        className="min-w-40 justify-start"
      >
        {purchaseStatus ? (
          <>
            <SquareCheck className="stroke-green-600" />
            <span className="text-green-600">Purchased</span>
          </>
        ) : (
          <>
            <SquareX />
            <span>Not purchased</span>
          </>
        )}
      </Button>
    </>
  );
}

export default Status;
