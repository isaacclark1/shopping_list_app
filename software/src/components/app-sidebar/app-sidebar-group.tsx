"use client";

import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { List, Plus, UserRoundPlus } from "lucide-react";
import AppSidebarItem from "./app-sidebar-item";

const menuAllUsersItems = [
  {
    title: "Shopping Lists",
    url: "/",
    icon: List,
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

type AppSidebarGroupProps = {
  group: string;
};

function AppSidebarGroup({ group }: AppSidebarGroupProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {group === "user" && (
        <>
          <SidebarGroupLabel>Shopping List</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuAllUsersItems.map((item) => (
                <AppSidebarItem
                  title={item.title}
                  url={item.url}
                  Icon={item.icon}
                  SidebarMenuActionIcon={item.sidebarMenuActionIcon}
                  key={item.url}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </>
      )}

      {group === "admin" && (
        <>
          <SidebarGroupLabel>Shopping List</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuAdminItems.map((item) => (
                <AppSidebarItem
                  title={item.title}
                  url={item.url}
                  Icon={item.icon}
                  key={item.url}
                  pathname="pathname"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </>
      )}
    </SidebarGroup>
  );
}

export default AppSidebarGroup;
