import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block border-r">
        <Sidebar />
      </aside>
      <div className="flex flex-col min-w-0">
        <div className="lg:hidden border-b">
          <Topbar />
        </div>
        <main className="font-normal max-w-[1920px] w-full mx-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
