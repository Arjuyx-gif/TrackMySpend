import React from "react";

export default function Placeholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">This page is a placeholder. Ask to flesh it out next.</p>
      {children}
    </div>
  );
}
