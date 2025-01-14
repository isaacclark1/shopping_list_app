"use client";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";

type AppSidebarItemProps = {
  title: string;
  url: string;
  Icon: React.ComponentType;
  pathname: string;
  SidebarMenuActionIcon?: React.ComponentType;
};

function AppSidebarItem({
  title,
  url,
  Icon,
  SidebarMenuActionIcon,
  pathname,
}: AppSidebarItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link href={url}>
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
      {SidebarMenuActionIcon && (
        <SidebarMenuAction>
          <SidebarMenuActionIcon />
          <span className="sr-only">Create new shopping list</span>
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}

export default AppSidebarItem;
