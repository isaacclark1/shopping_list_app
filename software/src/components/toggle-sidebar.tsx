"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";

const ToggleSidebar: React.FC = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggleSidebar}
      className="absolute top-1 left-2.5"
    >
      {open ? (
        <>
          <PanelLeftClose />
          <span className="text-xs">Close Sidebar</span>
        </>
      ) : (
        <>
          <PanelLeftOpen />
          <span className="text-xs">Open Sidebar</span>
        </>
      )}
    </Button>
  );
};

export default ToggleSidebar;
