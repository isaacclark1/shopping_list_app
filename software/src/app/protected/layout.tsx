import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import ToggleSidebar from "@/components/toggle-sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="p-5 pt-12 relative w-full">
        <ToggleSidebar />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
