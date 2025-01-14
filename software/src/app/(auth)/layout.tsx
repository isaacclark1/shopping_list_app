import { ThemeProvider } from "@/theme/theme-context";
import "../globals.css";
import { getUserNoRedirect } from "@/lib/server/auth/checkauth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserNoRedirect();

  if (user) {
    redirect("/");
  }

  return (
    <html lang="en">
      <ThemeProvider>
        <body className="antialiased">
          <main className="p-5 pt-12 relative w-full">{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
}
