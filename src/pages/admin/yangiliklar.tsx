"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/store";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function YangiliklarPage() {
  const { yangiliklar, addYangilik, deleteYangilik } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    sarlavha: "",
    mazmun: "",
    kategoriya: "Yangilik",
    rasm_emoji: "📰",
    rasm: "",
    sana: new Date().toISOString().split("T")[0],
  });

  const handleAddYangilik = () => {
    if (formData.sarlavha.trim() && formData.mazmun.trim()) {
      addYangilik({
        ...formData,
        layklar: 0,
        izohlar_soni: 0,
      });
      setFormData({
        sarlavha: "",
        mazmun: "",
        kategoriya: "Yangilik",
        rasm_emoji: "📰",
        rasm: "",
        sana: new Date().toISOString().split("T")[0],
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Yangiliklar
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              ➕ Yangi yangilik
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi yangilik qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Sarlavha</label>
                <Input
                  placeholder="Yangilikni sarlavhasi"
                  value={formData.sarlavha}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sarlavha: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Mazmun</label>
                <Textarea
                  placeholder="Yangilikni mazmuni"
                  value={formData.mazmun}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, mazmun: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Kategoriya</label>
                <Input
                  placeholder="Kategoriya"
                  value={formData.kategoriya}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kategoriya: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Emoji</label>
                <Input
                  placeholder="Emoji"
                  value={formData.rasm_emoji}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rasm_emoji: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rasm URL (ixtiyoriy)</label>
                <Input
                  placeholder="https://... yoki /images/..."
                  value={formData.rasm}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, rasm: e.target.value }))
                  }
                />
              </div>
              <Button
                onClick={handleAddYangilik}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {yangiliklar.map((yangilik) => (
          <Card
            key={yangilik.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
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
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => {
                      if (confirm("Yangilikni o'chirmoqchimisiz?")) {
                        deleteYangilik(yangilik.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {yangiliklar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday yangilik topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
