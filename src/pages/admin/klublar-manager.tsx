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
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/store";
import type { Klub } from "@/lib/types";
import { useState } from "react";

export default function KlublarManager() {
  const { klublar, sportTurlari, addKlub, updateKlub, deleteKlub } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKlub, setEditingKlub] = useState<Klub | null>(null);
  const [formData, setFormData] = useState({
    nomi: "",
    tavsif: "",
    sport_turi: "",
    rasm_emoji: "⚽",
    azolar_soni: 0,
  });

  const resetForm = () => {
    setFormData({
      nomi: "",
      tavsif: "",
      sport_turi: "",
      rasm_emoji: "⚽",
      azolar_soni: 0,
    });
    setEditingKlub(null);
  };

  const openEditDialog = (klub: Klub) => {
    setEditingKlub(klub);
    setFormData({
      nomi: klub.nomi,
      tavsif: klub.tavsif,
      sport_turi: klub.sport_turi,
      rasm_emoji: klub.rasm_emoji,
      azolar_soni: klub.azolar_soni,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingKlub) {
      updateKlub(editingKlub.id, formData);
    } else {
      addKlub(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Klublar ({klublar.length})
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
              + Yangi klub
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingKlub ? "Klubni tahrirlash" : "Yangi klub qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Klub nomi"
                value={formData.nomi}
                onChange={(e) =>
                  setFormData({ ...formData, nomi: e.target.value })
                }
              />
              <Select
                value={formData.sport_turi}
                onValueChange={(v) => {
                  const sport = sportTurlari.find((s) => s.nomi === v);
                  setFormData({
                    ...formData,
                    sport_turi: v,
                    rasm_emoji: sport?.rasm_emoji || "⚽",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sport turi" />
                </SelectTrigger>
                <SelectContent>
                  {sportTurlari.map((s) => (
                    <SelectItem key={s.id} value={s.nomi}>
                      {s.rasm_emoji} {s.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Tavsif"
                value={formData.tavsif}
                onChange={(e) =>
                  setFormData({ ...formData, tavsif: e.target.value })
                }
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {editingKlub ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {klublar.map((klub) => (
          <Card key={klub.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl">
                    {klub.rasm_emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {klub.nomi}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {klub.sport_turi} • {klub.azolar_soni} a'zo
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(klub)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteKlub(klub.id)}
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
