"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Yangilik } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface NewsCardProps {
  yangilik: Yangilik;
  onDelete?: (id: number) => void;
}

export function NewsCard({ yangilik, onDelete }: NewsCardProps) {
  return (
    <Card className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-6">
        {yangilik.rasm ? (
          <img
            src={yangilik.rasm}
            alt={yangilik.sarlavha}
            className="w-full h-48 object-cover rounded mb-4"
          />
        ) : (
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
            {yangilik.rasm_emoji}
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          {yangilik.sarlavha}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-3">
          {yangilik.mazmun}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
              {yangilik.kategoriya}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              📅 {yangilik.sana}
            </span>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              className="text-red-600"
              onClick={() => {
                if (confirm("Yangilikni o'chirmoqchimisiz?")) {
                  onDelete(yangilik.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
