"use client";

import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        {title}
      </h1>
      {children}
    </div>
  );
}
