"use client";

import { List, Plus, UserRoundPlus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAdmin } from "@/lib/client/auth/checkauth";

const menuAllUsersItems = [
  {
    title: "Shopping Lists",
    url: "/",
    icon: List,
    isSidebarMenuAction: true,
    sidebarMenuActionIcon: Plus,
  },
  {
    title: "Master Shopping List",
    url: "/mastershoppinglist",
    icon: List,
  },
];

const menuAdminItems = [
  {
    title: "Create User",
    url: "/admin/createuser",
    icon: UserRoundPlus,
  },
];

function AppSidebar() {
  const pathname = usePathname();
  const admin = getAdmin();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Shopping List</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuAllUsersItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.isSidebarMenuAction && (
                    <SidebarMenuAction>
                      <item.sidebarMenuActionIcon />{" "}
                      <span className="sr-only">Create new shopping list</span>
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {admin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
