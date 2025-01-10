import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-context";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Shopping List App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
