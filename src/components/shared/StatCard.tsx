"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  gradient: string;
}

export function StatCard({ icon, value, label, gradient }: StatCardProps) {
  return (
    <Card className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
          {value}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}
