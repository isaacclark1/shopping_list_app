import { getCategories } from "@/lib/server/category/operations";
import ServerError from "@/lib/ServerError";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const intId = Number.parseInt(id);

  try {
    const categories = await getCategories(intId);

    return Response.json({ status: 200, categories });
  } catch (error) {
    return Response.json({
      status: (error as ServerError).statusCode,
      message: (error as ServerError).message,
    });
  }
}
