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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TopAthletes } from "@/components/shared/TopAthletes";
import { YutuqCard } from "@/components/shared/YutuqCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/store";
import { useState } from "react";

export default function YutuqlarPage() {
  const { sportchilar, yutuqlar, addYutuq, deleteYutuq } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomi: "",
    sportchi_id: "",
    musobaqa: "",
    medal_turi: "oltin" as "oltin" | "kumush" | "bronza",
    medal_soni: 1,
    sana: new Date().toISOString().split("T")[0],
    rasm_emoji: "🥇",
  });

  const handleAddYutuq = () => {
    const selectedSportchi = sportchilar.find(
      (s) => s.id === parseInt(formData.sportchi_id),
    );
    if (
      selectedSportchi &&
      formData.nomi.trim() &&
      formData.musobaqa.trim()
    ) {
      addYutuq({
        nomi: formData.nomi,
        sportchi: {
          id: selectedSportchi.id,
          ism: selectedSportchi.ism,
        },
        musobaqa: formData.musobaqa,
        medal_turi: formData.medal_turi,
        medal_soni: formData.medal_soni,
        sana: formData.sana,
        rasm_emoji: formData.rasm_emoji,
      });
      setFormData({
        nomi: "",
        sportchi_id: "",
        musobaqa: "",
        medal_turi: "oltin",
        medal_soni: 1,
        sana: new Date().toISOString().split("T")[0],
        rasm_emoji: "🥇",
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Yutuqlar">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">➕ Yangi yutuq</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi yutuq qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Yutuq nomi</label>
                <Input
                  placeholder="Yutuqning nomi"
                  value={formData.nomi}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nomi: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sportchi</label>
                <Select
                  value={formData.sportchi_id}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, sportchi_id: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sportchi tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportchilar.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.ism} - {s.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Musobaqaning nomi</label>
                <Input
                  placeholder="Musobaqaning nomi"
                  value={formData.musobaqa}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      musobaqa: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Medal turi</label>
                <Select
                  value={formData.medal_turi}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      medal_turi: value as "oltin" | "kumush" | "bronza",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oltin">🥇 Oltin</SelectItem>
                    <SelectItem value="kumush">🥈 Kumush</SelectItem>
                    <SelectItem value="bronza">🥉 Bronza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Medal soni</label>
                <Input
                  type="number"
                  min="1"
                  value={formData.medal_soni}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      medal_soni: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <Button
                onClick={handleAddYutuq}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <TopAthletes sportchilar={sportchilar} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {yutuqlar.map((yutuq) => (
          <YutuqCard key={yutuq.id} yutuq={yutuq} onDelete={deleteYutuq} />
        ))}
      </div>

      {yutuqlar.length === 0 && (
        <EmptyState emoji="🏅" message="Hech qanday yutuq topilmadi" />
      )}
    </div>
  );
}
