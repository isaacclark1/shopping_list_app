import { ThemeProvider } from "@/theme/theme-context";
import { SessionProvider } from "next-auth/react";
import "../globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <SessionProvider>
          <body className="antialiased">
            <main className="p-5 pt-12 relative w-full">{children}</main>
          </body>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
