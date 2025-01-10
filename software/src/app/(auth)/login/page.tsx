import SignIn from "@/components/sign-in";
import { getUserNoRedirect } from "@/lib/server/auth/checkauth";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getUserNoRedirect();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <SignIn />
    </div>
  );
}

export default Page;
