import { Sidebar, SidebarContent } from "../ui/sidebar";

import { getAdmin } from "@/lib/server/auth/checkauth";

import AppSidebarGroup from "./app-sidebar-group";

async function AppSidebar() {
  const admin = await getAdmin();

  return (
    <Sidebar>
      <SidebarContent>
        <AppSidebarGroup group="user" />

        {admin && <AppSidebarGroup group="admin" />}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
