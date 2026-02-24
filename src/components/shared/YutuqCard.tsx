"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Yutuq } from "@/lib/types";
import { getMedalEmoji } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface YutuqCardProps {
  yutuq: Yutuq;
  onDelete?: (id: number) => void;
}

export function YutuqCard({ yutuq, onDelete }: YutuqCardProps) {
  return (
    <Card className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-6">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
          {getMedalEmoji(yutuq.medal_turi)}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          {yutuq.nomi}
        </h3>
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <p>👤 {yutuq.sportchi.ism}</p>
          <p>🏆 {yutuq.musobaqa}</p>
          <p>
            🥇 {yutuq.medal_soni}x {yutuq.medal_turi}
          </p>
          <p className="text-slate-500">📅 {yutuq.sana}</p>
        </div>
        {onDelete && (
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              className="text-red-600"
              onClick={() => {
                if (confirm("Yutuqni o'chirmoqchimisiz?")) {
                  onDelete(yutuq.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
