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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/store";
import { getMedalEmoji } from "@/lib/utils";
import { useState } from "react";

export default function YutuqlarPage() {
  const { sportchilar, yutuqlar, addYutuq } = useApp();
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

  const topSportchilar = [...sportchilar]
    .sort((a, b) => b.medallar - a.medallar)
    .slice(0, 10);

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Yutuqlar
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              ➕ Yangi yutuq
            </Button>
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
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                Qo'shish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Top 10 Athletes */}
      {topSportchilar.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Top 10 Sportchilar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topSportchilar.map((s, i) => {
                const bgColor =
                  i === 0
                    ? "bg-yellow-300 text-slate-800"
                    : i === 1
                      ? "bg-gray-300 text-slate-800"
                      : i === 2
                        ? "bg-orange-300 text-slate-800"
                        : "bg-white/90 text-slate-800";
                return (
                  <div
                    key={s.id}
                    className={`${bgColor} rounded-lg p-4 flex items-center gap-4`}
                  >
                    <div className="text-3xl font-bold">{i + 1}</div>
                    <div className="text-3xl">{s.avatar_emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{s.ism}</h4>
                      <p className="text-sm opacity-80">
                        {s.sport} | {s.fakultet}
                      </p>
                      <p className="text-sm">
                        🏅 {s.medallar} medal | {"⭐".repeat(s.yulduzlar)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {yutuqlar.map((yutuq) => (
          <Card
            key={yutuq.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
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
            </CardContent>
          </Card>
        ))}
      </div>

      {yutuqlar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏅</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday yutuq topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
