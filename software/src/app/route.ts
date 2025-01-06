import { getUserRedirect } from "@/lib/server/auth/checkauth";
import { redirect } from "next/navigation";

export async function GET() {
  await getUserRedirect();

  redirect("/protected/shoppinglists");
}
