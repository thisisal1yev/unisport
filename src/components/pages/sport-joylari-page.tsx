"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { tumanlar } from "@/lib/mock-data";
import type { SportJoy } from "@/lib/types";

export function SportJoylariPage() {
  const { sportTurlari, sportJoylari, addSportJoy, updateSportJoy, deleteSportJoy } = useApp();

  const [filterSport, setFilterSport] = useState<string>("");
  const [filterTuman, setFilterTuman] = useState<string>("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingJoy, setEditingJoy] = useState<SportJoy | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nomi: "",
    manzil: "",
    kenglik: "",
    uzunlik: "",
    tuman: "",
    sport_turlari: "",
    telefon: "",
    ish_vaqti: "",
    reyting: "4.5",
  });

  const filteredJoylar = sportJoylari.filter((joy) => {
    const matchesSport = !filterSport || joy.sport_turlari.includes(filterSport);
    const matchesTuman = !filterTuman || joy.tuman === filterTuman;
    return matchesSport && matchesTuman;
  });

  const resetForm = () => {
    setFormData({
      nomi: "",
      manzil: "",
      kenglik: "",
      uzunlik: "",
      tuman: "",
      sport_turlari: "",
      telefon: "",
      ish_vaqti: "",
      reyting: "4.5",
    });
  };

  const handleAdd = () => {
    addSportJoy({
      nomi: formData.nomi,
      manzil: formData.manzil,
      kenglik: Number.parseFloat(formData.kenglik),
      uzunlik: Number.parseFloat(formData.uzunlik),
      tuman: formData.tuman,
      sport_turlari: formData.sport_turlari.split(",").map((s) => s.trim()),
      telefon: formData.telefon || undefined,
      ish_vaqti: formData.ish_vaqti || undefined,
      reyting: Number.parseFloat(formData.reyting),
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleEdit = () => {
    if (!editingJoy) return;
    updateSportJoy(editingJoy.id, {
      nomi: formData.nomi,
      manzil: formData.manzil,
      kenglik: Number.parseFloat(formData.kenglik),
      uzunlik: Number.parseFloat(formData.uzunlik),
      tuman: formData.tuman,
      sport_turlari: formData.sport_turlari.split(",").map((s) => s.trim()),
      telefon: formData.telefon || undefined,
      ish_vaqti: formData.ish_vaqti || undefined,
      reyting: Number.parseFloat(formData.reyting),
    });
    resetForm();
    setEditingJoy(null);
  };

  const openEditModal = (joy: SportJoy) => {
    setFormData({
      nomi: joy.nomi,
      manzil: joy.manzil,
      kenglik: joy.kenglik.toString(),
      uzunlik: joy.uzunlik.toString(),
      tuman: joy.tuman,
      sport_turlari: joy.sport_turlari.join(", "),
      telefon: joy.telefon || "",
      ish_vaqti: joy.ish_vaqti || "",
      reyting: joy.reyting.toString(),
    });
    setEditingJoy(joy);
  };

  const handleDelete = (id: number) => {
    if (confirm("Haqiqatan ham bu sport joyini o'chirmoqchimisiz?")) {
      deleteSportJoy(id);
    }
  };

  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Nomi *
        </label>
        <Input
          value={formData.nomi}
          onChange={(e) => setFormData({ ...formData, nomi: e.target.value })}
          placeholder="Sport majmuasi nomi"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Manzil *
        </label>
        <Input
          value={formData.manzil}
          onChange={(e) => setFormData({ ...formData, manzil: e.target.value })}
          placeholder="To'liq manzil"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Kenglik (latitude) *
          </label>
          <Input
            type="number"
            step="0.000001"
            value={formData.kenglik}
            onChange={(e) => setFormData({ ...formData, kenglik: e.target.value })}
            placeholder="40.3839"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Uzunlik (longitude) *
          </label>
          <Input
            type="number"
            step="0.000001"
            value={formData.uzunlik}
            onChange={(e) => setFormData({ ...formData, uzunlik: e.target.value })}
            placeholder="71.7873"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Tuman *
        </label>
        <Select
          value={formData.tuman}
          onValueChange={(value) => setFormData({ ...formData, tuman: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tuman tanlang" />
          </SelectTrigger>
          <SelectContent>
            {tumanlar.map((tuman) => (
              <SelectItem key={tuman} value={tuman}>
                {tuman}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Sport turlari (vergul bilan ajrating) *
        </label>
        <Input
          value={formData.sport_turlari}
          onChange={(e) => setFormData({ ...formData, sport_turlari: e.target.value })}
          placeholder="Futbol, Basketbol, Voleybol"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Telefon
          </label>
          <Input
            value={formData.telefon}
            onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
            placeholder="+998 73 ..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Ish vaqti
          </label>
          <Input
            value={formData.ish_vaqti}
            onChange={(e) => setFormData({ ...formData, ish_vaqti: e.target.value })}
            placeholder="08:00 - 20:00"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Reyting (1-5)
        </label>
        <Input
          type="number"
          step="0.1"
          min="1"
          max="5"
          value={formData.reyting}
          onChange={(e) => setFormData({ ...formData, reyting: e.target.value })}
        />
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          className="flex-1"
          onClick={isEdit ? handleEdit : handleAdd}
          disabled={!formData.nomi || !formData.manzil || !formData.tuman || !formData.sport_turlari}
        >
          {isEdit ? "Saqlash" : "Qo'shish"}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            resetForm();
            setAddModalOpen(false);
            setEditingJoy(null);
          }}
        >
          Bekor qilish
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Sport joylari
        </h1>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <span className="mr-2">📍</span> Joy qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>📍 Sport joyi qo'shish</DialogTitle>
            </DialogHeader>
            <FormContent />
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
                <SelectItem value=" ">Barcha sport turlari</SelectItem>
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
                <SelectItem value=" ">Barcha tumanlar</SelectItem>
                {tumanlar.map((tuman) => (
                  <SelectItem key={tuman} value={tuman}>
                    {tuman}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setFilterSport("");
                setFilterTuman("");
              }}
            >
              Tozalash
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Xarita
          </h3>
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🗺️</div>
              <p className="text-slate-600 dark:text-slate-300">
                Interaktiv xarita ({filteredJoylar.length} joy)
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Yandex Maps API bilan integratsiya
              </p>
            </div>
          </div>
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
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {joy.nomi}
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(joy)}
                    className="text-xl hover:scale-110 transition-transform"
                    title="Tahrirlash"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(joy.id)}
                    className="text-xl hover:scale-110 transition-transform"
                    title="O'chirish"
                  >
                    🗑️
                  </button>
                </div>
              </div>
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

      {/* Edit Modal */}
      <Dialog open={!!editingJoy} onOpenChange={() => setEditingJoy(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Sport joyini tahrirlash</DialogTitle>
          </DialogHeader>
          <FormContent isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
}
