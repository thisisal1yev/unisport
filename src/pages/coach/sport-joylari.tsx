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
import { YandexMap } from "@/components/ui/yandex-map";
import { TUMANLAR } from "@/lib/constants";
import { useApp } from "@/lib/store";
import type { SportJoy } from "@/lib/types";
import { useState } from "react";

export default function CoachSportJoylari() {
  const { sportTurlari, sportJoylari, addSportJoy, updateSportJoy, deleteSportJoy } = useApp();

  const [filterSport, setFilterSport] = useState("all");
  const [filterTuman, setFilterTuman] = useState("all");
  const [selectedJoyId, setSelectedJoyId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJoy, setEditingJoy] = useState<SportJoy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomi: "",
    manzil: "",
    kenglik: 40.38,
    uzunlik: 71.78,
    tuman: "",
    sport_turlari: [] as string[],
    telefon: "",
    ish_vaqti: "",
    reyting: 4.0,
  });

  const filteredJoylar = sportJoylari.filter((joy) => {
    const matchesSport =
      filterSport === "all" || joy.sport_turlari.includes(filterSport);
    const matchesTuman = filterTuman === "all" || joy.tuman === filterTuman;
    return matchesSport && matchesTuman;
  });

  const resetForm = () => {
    setFormData({
      nomi: "",
      manzil: "",
      kenglik: 40.38,
      uzunlik: 71.78,
      tuman: "",
      sport_turlari: [],
      telefon: "",
      ish_vaqti: "",
      reyting: 4.0,
    });
    setEditingJoy(null);
  };

  const openEditDialog = (joy: SportJoy) => {
    setEditingJoy(joy);
    setFormData({
      nomi: joy.nomi,
      manzil: joy.manzil,
      kenglik: joy.kenglik,
      uzunlik: joy.uzunlik,
      tuman: joy.tuman,
      sport_turlari: joy.sport_turlari,
      telefon: joy.telefon || "",
      ish_vaqti: joy.ish_vaqti || "",
      reyting: joy.reyting,
    });
    setIsDialogOpen(true);
  };

  const toggleSport = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sport_turlari: prev.sport_turlari.includes(sport)
        ? prev.sport_turlari.filter((s) => s !== sport)
        : [...prev.sport_turlari, sport],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nomi || !formData.manzil || !formData.tuman) return;
    setIsSubmitting(true);
    if (editingJoy) {
      await updateSportJoy(editingJoy.id, formData);
    } else {
      await addSportJoy(formData);
    }
    setIsSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    await deleteSportJoy(id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Sport joylari
        </h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              + Yangi joy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJoy ? "Joyni tahrirlash" : "Yangi sport joyi"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Joy nomi *"
                value={formData.nomi}
                onChange={(e) =>
                  setFormData({ ...formData, nomi: e.target.value })
                }
              />
              <Input
                placeholder="Manzil *"
                value={formData.manzil}
                onChange={(e) =>
                  setFormData({ ...formData, manzil: e.target.value })
                }
              />
              <Select
                value={formData.tuman}
                onValueChange={(v) => setFormData({ ...formData, tuman: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tuman *" />
                </SelectTrigger>
                <SelectContent>
                  {TUMANLAR.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Telefon"
                  value={formData.telefon}
                  onChange={(e) =>
                    setFormData({ ...formData, telefon: e.target.value })
                  }
                />
                <Input
                  placeholder="Ish vaqti (06:00-22:00)"
                  value={formData.ish_vaqti}
                  onChange={(e) =>
                    setFormData({ ...formData, ish_vaqti: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="Kenglik (lat)"
                  value={formData.kenglik}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kenglik: Number(e.target.value),
                    })
                  }
                />
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="Uzunlik (lng)"
                  value={formData.uzunlik}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      uzunlik: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Input
                type="number"
                step="0.1"
                placeholder="Reyting (1-5)"
                value={formData.reyting}
                onChange={(e) =>
                  setFormData({ ...formData, reyting: Number(e.target.value) })
                }
              />
              {/* Sport turlari multi-select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Sport turlari
                </label>
                <div className="flex flex-wrap gap-2">
                  {sportTurlari.map((sport) => (
                    <button
                      type="button"
                      key={sport.id}
                      onClick={() => toggleSport(sport.nomi)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        formData.sport_turlari.includes(sport.nomi)
                          ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {sport.rasm_emoji} {sport.nomi}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {isSubmitting
                  ? "Yuklanmoqda..."
                  : editingJoy
                    ? "Saqlash"
                    : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Filtrlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filterSport} onValueChange={setFilterSport}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha sport turlari" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha sport turlari</SelectItem>
                {sportTurlari.map((sport) => (
                  <SelectItem key={sport.id} value={sport.nomi}>
                    {sport.nomi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterTuman} onValueChange={setFilterTuman}>
              <SelectTrigger>
                <SelectValue placeholder="Barcha tumanlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha tumanlar</SelectItem>
                {TUMANLAR.map((tuman) => (
                  <SelectItem key={tuman} value={tuman}>
                    {tuman}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setFilterSport("all");
                setFilterTuman("all");
              }}
            >
              Tozalash
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yandex Map */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Xarita
          </h3>
          <YandexMap
            locations={filteredJoylar}
            selectedLocationId={selectedJoyId}
            onLocationSelect={(loc) => setSelectedJoyId(loc.id)}
          />
        </CardContent>
      </Card>

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJoylar.map((joy) => (
          <Card
            key={joy.id}
            className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-white dark:bg-slate-800"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                {joy.nomi}
              </h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>📍 {joy.manzil}</p>
                <p>🏘️ {joy.tuman} tumani</p>
                <p>📞 {joy.telefon || "Ma'lumot yo'q"}</p>
                <p>⏰ {joy.ish_vaqti || "Ma'lumot yo'q"}</p>
                <p>⭐ {joy.reyting}/5.0</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {joy.sport_turlari.map((sport) => (
                  <span
                    key={sport}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {sport}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(joy)}
                >
                  ✏️ Tahrirlash
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(joy.id)}
                >
                  🗑️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJoylar.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday sport joyi topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
