import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function Topbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <button className="p-2 rounded-md hover:bg-accent" onClick={() => setOpen(!open)} aria-label="Open menu">
        <Menu />
      </button>
      <div className="font-extrabold tracking-tight">TrackMyFin</div>
      <div />
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}
