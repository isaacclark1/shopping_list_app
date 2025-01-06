import {
  changeIsPurchasedStatus,
  changeQuantity,
  deleteItem,
} from "@/lib/server/shopping-list-item/operations";
import ServerError from "@/lib/ServerError";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

type ChangeQuantityData = {
  operation: "increment" | "decrement";
};

type ChangeIsPurchasedStatus = {
  currentStatus: boolean;
};

type PATCHRequestBody = {
  attribute: string;
  data: ChangeQuantityData | ChangeIsPurchasedStatus;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const { attribute, data }: PATCHRequestBody = await request.json();

  const intId = Number.parseInt(id);

  /*
    Change the quantity of an item.
  */
  if (attribute === "quantity") {
    if ("operation" in data) {
      const { operation } = data;

      try {
        const quantity = await changeQuantity(intId, operation);

        return Response.json({ status: 200, quantity });
      } catch (error) {
        return Response.json({
          status: (error as ServerError).statusCode,
          message: (error as ServerError).message,
        });
      }
    } else {
      return Response.json({
        status: 400,
        message: "Invalid data supplied to modify item quantity",
      });
    }
  }

  /*
    Change the isPurchased status of an item.
  */
  if (attribute === "isPurchased") {
    if ("currentStatus" in data) {
      const { currentStatus } = data;

      try {
        const newStatus = await changeIsPurchasedStatus(intId, currentStatus);

        return Response.json({ status: 200, newStatus });
      } catch (error) {
        return Response.json({
          status: (error as ServerError).statusCode,
          message: (error as ServerError).message,
        });
      }
    } else {
      return Response.json({
        status: 400,
        message:
          "Invalid data supplied to modify the purchased status of the item",
      });
    }
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const intId = Number.parseInt(id);

  try {
    await deleteItem(intId);

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({
      status: (error as ServerError).statusCode,
      message: (error as ServerError).message,
    });
  }
}
