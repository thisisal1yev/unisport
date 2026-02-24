"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsCard } from "@/components/shared/NewsCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/store";
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
      <PageHeader title="Yangiliklar">
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
      </PageHeader>

      <div className="space-y-6">
        {yangiliklar.map((yangilik) => (
          <NewsCard
            key={yangilik.id}
            yangilik={yangilik}
            onDelete={deleteYangilik}
          />
        ))}
      </div>

      {yangiliklar.length === 0 && (
        <EmptyState emoji="📰" message="Hech qanday yangilik topilmadi" />
      )}
    </div>
  );
}
