import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../../theme/theme-context";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import ToggleSidebar from "@/components/toggle-sidebar";
import { Toaster } from "@/components/ui/toaster";

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
      <ThemeProvider>
        <SessionProvider>
          <body className="antialiased">
            <SidebarProvider>
              <AppSidebar />

              <main className="p-5 pt-12 relative w-full">
                <ToggleSidebar />
                {children}
              </main>
              <Toaster />
            </SidebarProvider>
          </body>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
