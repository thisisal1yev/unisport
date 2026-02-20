"use client";

import { useApp } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVATAR_EMOJIS, FAKULTETLAR, GURUHLAR } from "@/lib/constants";
import { User, Mail, Phone, Calendar, Edit2, Save } from "lucide-react";
import { useState } from "react";
import type { NextPage } from "next";

const CoachProfil: NextPage = () => {
  const { currentUser, updateProfile, sportTurlari } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ism: currentUser?.ism || "",
    familiya: currentUser?.familiya || "",
    telefon: currentUser?.telefon || "",
    tug_sana: currentUser?.tug_sana || "",
    fakultet: currentUser?.fakultet || "",
    guruh: currentUser?.guruh || "",
    vazn: currentUser?.vazn?.toString() || "",
    boy: currentUser?.boy?.toString() || "",
    avatar_emoji: currentUser?.avatar_emoji || "🧑",
    bio: currentUser?.bio || "",
    sport_turlari: currentUser?.sport_turlari || [],
  });

  const handleSave = async () => {
    setIsSubmitting(true);
    await updateProfile({
      ism: formData.ism,
      familiya: formData.familiya,
      telefon: formData.telefon || undefined,
      tug_sana: formData.tug_sana || undefined,
      fakultet: formData.fakultet || undefined,
      guruh: formData.guruh || undefined,
      vazn: formData.vazn ? Number.parseFloat(formData.vazn) : undefined,
      boy: formData.boy ? Number.parseFloat(formData.boy) : undefined,
      avatar_emoji: formData.avatar_emoji,
      bio: formData.bio || undefined,
      sport_turlari: formData.sport_turlari,
    });
    setIsSubmitting(false);
    setIsEditing(false);
  };

  const startEditing = () => {
    setFormData({
      ism: currentUser?.ism || "",
      familiya: currentUser?.familiya || "",
      telefon: currentUser?.telefon || "",
      tug_sana: currentUser?.tug_sana || "",
      fakultet: currentUser?.fakultet || "",
      guruh: currentUser?.guruh || "",
      vazn: currentUser?.vazn?.toString() || "",
      boy: currentUser?.boy?.toString() || "",
      avatar_emoji: currentUser?.avatar_emoji || "🧑",
      bio: currentUser?.bio || "",
      sport_turlari: currentUser?.sport_turlari || [],
    });
    setIsEditing(true);
  };

  const toggleSport = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sport_turlari: prev.sport_turlari.includes(sport)
        ? prev.sport_turlari.filter((s) => s !== sport)
        : [...prev.sport_turlari, sport],
    }));
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Siz tizimga kirmagansiz</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profil</h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          disabled={isSubmitting}
          onClick={isEditing ? handleSave : startEditing}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Tahrirlash
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Shaxsiy ma'lumotlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_EMOJIS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, avatar_emoji: emoji }))
                      }
                      className={`w-10 h-10 text-xl rounded-lg transition-all ${
                        formData.avatar_emoji === emoji
                          ? "bg-emerald-100 dark:bg-emerald-900 ring-2 ring-emerald-500"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="text-7xl">{currentUser.avatar_emoji}</div>
              </div>
            )}

            {/* Ism */}
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              {isEditing ? (
                <div className="grid grid-cols-2 gap-2 flex-1">
                  <Input
                    value={formData.ism}
                    onChange={(e) =>
                      setFormData({ ...formData, ism: e.target.value })
                    }
                    placeholder="Ism"
                  />
                  <Input
                    value={formData.familiya}
                    onChange={(e) =>
                      setFormData({ ...formData, familiya: e.target.value })
                    }
                    placeholder="Familiya"
                  />
                </div>
              ) : (
                <span>
                  {currentUser.ism} {currentUser.familiya}
                </span>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>{currentUser.email}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              {isEditing ? (
                <Input
                  value={formData.telefon}
                  onChange={(e) =>
                    setFormData({ ...formData, telefon: e.target.value })
                  }
                  placeholder="Telefon"
                  className="flex-1"
                />
              ) : (
                <span>{currentUser.telefon || "Ko'rsatilmagan"}</span>
              )}
            </div>

            {/* Birth date */}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              {isEditing ? (
                <Input
                  type="date"
                  value={formData.tug_sana}
                  onChange={(e) =>
                    setFormData({ ...formData, tug_sana: e.target.value })
                  }
                  className="flex-1"
                />
              ) : (
                <span>{currentUser.tug_sana || "Ko'rsatilmagan"}</span>
              )}
            </div>

            {/* Bio */}
            {isEditing ? (
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="O'zingiz haqingizda..."
                  rows={3}
                />
              </div>
            ) : (
              currentUser.bio && (
                <p className="text-sm text-muted-foreground">
                  {currentUser.bio}
                </p>
              )
            )}
          </CardContent>
        </Card>

        {/* Additional info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Qo'shimcha ma'lumotlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Fakultet & Guruh */}
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={formData.fakultet}
                  onValueChange={(v) =>
                    setFormData({ ...formData, fakultet: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fakultet" />
                  </SelectTrigger>
                  <SelectContent>
                    {FAKULTETLAR.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.guruh}
                  onValueChange={(v) => setFormData({ ...formData, guruh: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Guruh" />
                  </SelectTrigger>
                  <SelectContent>
                    {GURUHLAR.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fakultet</span>
                  <span>{currentUser.fakultet || "Ko'rsatilmagan"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Guruh</span>
                  <span>{currentUser.guruh || "Ko'rsatilmagan"}</span>
                </div>
              </>
            )}

            {/* Vazn & Boy */}
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Vazn (kg)"
                  value={formData.vazn}
                  onChange={(e) =>
                    setFormData({ ...formData, vazn: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Bo'y (cm)"
                  value={formData.boy}
                  onChange={(e) =>
                    setFormData({ ...formData, boy: e.target.value })
                  }
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vazn</span>
                  <span>
                    {currentUser.vazn ? `${currentUser.vazn} kg` : "Ko'rsatilmagan"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bo'y</span>
                  <span>
                    {currentUser.boy ? `${currentUser.boy} cm` : "Ko'rsatilmagan"}
                  </span>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rol</span>
              <Badge variant={currentUser.isAdmin ? "default" : "secondary"}>
                {currentUser.isAdmin ? "Admin" : "Foydalanuvchi"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ro'yxatdan o'tgan</span>
              <span>{currentUser.ro_yxatdan_sana}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Klublar</span>
              <Badge variant="outline">{currentUser.klublar_ids.length}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Musobaqalar</span>
              <Badge variant="outline">
                {currentUser.musobaqalar_ids.length}
              </Badge>
            </div>

            {/* Sport turlari */}
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Sport turlari
                </label>
                <div className="flex flex-wrap gap-2">
                  {sportTurlari.slice(0, 10).map((sport) => (
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
            ) : (
              currentUser.sport_turlari.length > 0 && (
                <div className="space-y-2">
                  <span className="text-muted-foreground text-sm">
                    Sport turlari
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.sport_turlari.map((sport) => (
                      <Badge key={sport} variant="outline">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoachProfil;
