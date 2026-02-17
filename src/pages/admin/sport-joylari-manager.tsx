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
import { TUMANLAR } from "@/lib/constants";
import { useApp } from "@/lib/store";
import type { SportJoy } from "@/lib/types";
import { useState } from "react";

export function SportJoylariManager() {
  const {
    sportJoylari,
    addSportJoy,
    updateSportJoy,
    deleteSportJoy,
  } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJoy, setEditingJoy] = useState<SportJoy | null>(null);
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

  const handleSubmit = () => {
    if (editingJoy) {
      updateSportJoy(editingJoy.id, formData);
    } else {
      addSportJoy(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Sport joylari ({sportJoylari.length})
        </h2>
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
                placeholder="Joy nomi"
                value={formData.nomi}
                onChange={(e) =>
                  setFormData({ ...formData, nomi: e.target.value })
                }
              />
              <Input
                placeholder="Manzil"
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
                  <SelectValue placeholder="Tuman" />
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
              <Input
                type="number"
                step="0.1"
                placeholder="Reyting (1-5)"
                value={formData.reyting}
                onChange={(e) =>
                  setFormData({ ...formData, reyting: Number(e.target.value) })
                }
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {editingJoy ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {sportJoylari.map((joy) => (
          <Card key={joy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {joy.nomi}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {joy.manzil} • ⭐ {joy.reyting}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(joy)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSportJoy(joy.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
