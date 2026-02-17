"use client";

import { Badge } from "@/components/ui/badge";
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
import type { Sportchi } from "@/lib/types";
import { useState } from "react";

export default function SportchilarManager() {
  const {
    sportchilar,
    sportTurlari,
    klublar,
    addSportchi,
    updateSportchi,
    deleteSportchi,
  } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSportchi, setEditingSportchi] = useState<Sportchi | null>(null);
  const [formData, setFormData] = useState({
    ism: "",
    sport: "",
    fakultet: "",
    guruh: "",
    daraja: "Havaskor" as "Boshlovchi" | "Havaskor" | "Professional",
    medallar: 0,
    yulduzlar: 3,
    avatar_emoji: "🧑",
    telefon: "",
    tug_yil: 2000,
    bio: "",
    klub: "",
    klub_id: undefined as number | undefined,
  });

  const resetForm = () => {
    setFormData({
      ism: "",
      sport: "",
      fakultet: "",
      guruh: "",
      daraja: "Havaskor",
      medallar: 0,
      yulduzlar: 3,
      avatar_emoji: "🧑",
      telefon: "",
      tug_yil: 2000,
      bio: "",
      klub: "",
      klub_id: undefined,
    });
    setEditingSportchi(null);
  };

  const openEditDialog = (sportchi: Sportchi) => {
    setEditingSportchi(sportchi);
    setFormData({
      ism: sportchi.ism,
      sport: sportchi.sport,
      fakultet: sportchi.fakultet || "",
      guruh: sportchi.guruh || "",
      daraja: sportchi.daraja,
      medallar: sportchi.medallar,
      yulduzlar: sportchi.yulduzlar,
      avatar_emoji: sportchi.avatar_emoji,
      telefon: sportchi.telefon || "",
      tug_yil: sportchi.tug_yil || 2000,
      bio: sportchi.bio || "",
      klub: sportchi.klub || "",
      klub_id: sportchi.klub_id,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingSportchi) {
      updateSportchi(editingSportchi.id, formData);
    } else {
      addSportchi(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      deleteSportchi(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Sportchilar ({sportchilar.length})
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
              + Yangi sportchi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSportchi
                  ? "Sportchini tahrirlash"
                  : "Yangi sportchi qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Ism familiya"
                value={formData.ism}
                onChange={(e) =>
                  setFormData({ ...formData, ism: e.target.value })
                }
              />
              <Select
                value={formData.sport}
                onValueChange={(v) => setFormData({ ...formData, sport: v })}
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
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Fakultet"
                  value={formData.fakultet}
                  onChange={(e) =>
                    setFormData({ ...formData, fakultet: e.target.value })
                  }
                />
                <Input
                  placeholder="Guruh"
                  value={formData.guruh}
                  onChange={(e) =>
                    setFormData({ ...formData, guruh: e.target.value })
                  }
                />
              </div>
              <Select
                value={formData.daraja}
                onValueChange={(
                  v: "Boshlovchi" | "Havaskor" | "Professional",
                ) => setFormData({ ...formData, daraja: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Daraja" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boshlovchi">Boshlovchi</SelectItem>
                  <SelectItem value="Havaskor">Havaskor</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Medallar"
                  value={formData.medallar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medallar: Number(e.target.value),
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Tug'ilgan yil"
                  value={formData.tug_yil}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tug_yil: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Input
                placeholder="Telefon"
                value={formData.telefon}
                onChange={(e) =>
                  setFormData({ ...formData, telefon: e.target.value })
                }
              />
              <Select
                value={formData.klub_id?.toString() || ""}
                onValueChange={(v) => {
                  const klub = klublar.find((k) => k.id === Number(v));
                  setFormData({
                    ...formData,
                    klub_id: Number(v),
                    klub: klub?.nomi || "",
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Klub (ixtiyoriy)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Klub yo'q</SelectItem>
                  {klublar.map((k) => (
                    <SelectItem key={k.id} value={k.id.toString()}>
                      {k.rasm_emoji} {k.nomi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {editingSportchi ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {sportchilar.map((sportchi) => (
          <Card key={sportchi.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                    {sportchi.avatar_emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {sportchi.ism}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{sportchi.sport}</span>
                      <span>•</span>
                      <Badge
                        variant={
                          sportchi.daraja === "Professional"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {sportchi.daraja}
                      </Badge>
                      <span>•</span>
                      <span>🏅 {sportchi.medallar}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(sportchi)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(sportchi.id)}
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
