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
  const { sportchilar, yutuqlar, addYutuq, deleteYutuq } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sportchi_id: "",
    nomi: "",
    musobaqa: "",
    medal_turi: "oltin" as "oltin" | "kumush" | "bronza",
    medal_soni: "1",
  });

  const resetForm = () => {
    setFormData({
      sportchi_id: "",
      nomi: "",
      musobaqa: "",
      medal_turi: "oltin",
      medal_soni: "1",
    });
  };

  const handleAdd = () => {
    const sportchi = sportchilar.find(
      (s) => s.id === Number.parseInt(formData.sportchi_id),
    );
    if (!sportchi) return;

    addYutuq({
      nomi: formData.nomi,
      sportchi: { id: sportchi.id, ism: sportchi.ism },
      musobaqa: formData.musobaqa,
      medal_turi: formData.medal_turi,
      medal_soni: Number.parseInt(formData.medal_soni),
      sana: new Date().toISOString().split("T")[0],
      rasm_emoji: getMedalEmoji(formData.medal_turi),
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Haqiqatan ham bu yutuqni o'chirmoqchimisiz?")) {
      deleteYutuq(id);
    }
  };

  // Calculate top 10 athletes by medals
  const topSportchilar = [...sportchilar]
    .sort((a, b) => b.medallar - a.medallar)
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Yutuqlar
        </h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
              <span className="mr-2">🏅</span> Yutuq qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>🏅 Yutuq qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Sportchi *
                </label>
                <Select
                  value={formData.sportchi_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sportchi_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sportchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportchilar.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.avatar_emoji} {s.ism} - {s.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Yutuq nomi *
                </label>
                <Input
                  value={formData.nomi}
                  onChange={(e) =>
                    setFormData({ ...formData, nomi: e.target.value })
                  }
                  placeholder="1-o'rin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Musobaqa *
                </label>
                <Input
                  value={formData.musobaqa}
                  onChange={(e) =>
                    setFormData({ ...formData, musobaqa: e.target.value })
                  }
                  placeholder="Viloyat chempionati"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Medal turi *
                </label>
                <Select
                  value={formData.medal_turi}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      medal_turi: value as "oltin" | "kumush" | "bronza",
                    })
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
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Medallar soni
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.medal_soni}
                  onChange={(e) =>
                    setFormData({ ...formData, medal_soni: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600"
                  onClick={handleAdd}
                  disabled={
                    !formData.sportchi_id ||
                    !formData.nomi ||
                    !formData.musobaqa
                  }
                >
                  Qo'shish
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    resetForm();
                    setAddModalOpen(false);
                  }}
                >
                  Bekor qilish
                </Button>
              </div>
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
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {getMedalEmoji(yutuq.medal_turi)}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(yutuq.id)}
                  className="text-xl hover:scale-110 transition-transform"
                >
                  🗑️
                </button>
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
