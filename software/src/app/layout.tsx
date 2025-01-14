import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-context";
import { getUserRedirect } from "@/lib/server/auth/checkauth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shopping List App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getUserRedirect();

  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
