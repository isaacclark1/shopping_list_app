import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../../theme/theme-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import ToggleSidebar from "@/components/app-sidebar/toggle-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getUserRedirect } from "@/lib/server/auth/checkauth";

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
      <ThemeProvider>
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
      </ThemeProvider>
    </html>
  );
}
