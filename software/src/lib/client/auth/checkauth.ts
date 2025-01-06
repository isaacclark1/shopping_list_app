import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const getUserRedirect = (): Session["user"] => {
  const { data } = useSession();

  if (!data) {
    redirect("/login");
  }

  return data.user;
};

export const getAdmin = (): Session["user"] | null => {
  const { data } = useSession();

  if (!data || data.user.role !== "admin") return null;

  return data.user;
};
