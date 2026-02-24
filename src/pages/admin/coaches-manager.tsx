"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";

export default function AdminCoachesManager() {
  const { users, sportchilar, updateProfile, setUserRole, assignCoachToSportsman, removeCoachFromSportsman } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoach, setSelectedCoach] = useState<User | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    ism: "",
    familiya: "",
    email: "",
    telefon: "",
    sport_turlari: [] as string[],
  });

  // Filter coaches and users with coach role
  const coaches = users.filter(
    (u) => u.role === "coach" || u.fakultet === "Coach"
  );

  // Get all sportsmen
  const sportsmen = sportchilar;

  // Filter coaches by search
  const filteredCoaches = coaches.filter(
    (c) =>
      c.ism.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      ism: "",
      familiya: "",
      email: "",
      telefon: "",
      sport_turlari: [],
    });
  };

  const handleCreateCoach = () => {
    // In a real app, this would create a new user with coach role via Supabase Auth
    alert("Coach yaratish uchun admin panel orqali foydalanuvchi yarating va 'coach' rolini tanlang");
    setIsDialogOpen(false);
    resetForm();
  };

  const handleAssignCoach = (coachId: number, sportsmanId: number) => {
    assignCoachToSportsman(coachId, sportsmanId);
    setAssignDialogOpen(false);
  };

  const getSportsmenForCoach = (coach: User) => {
    return sportsmen.filter((s) => s.coach_id === coach.id);
  };

  const getUnassignedSportsmen = () => {
    return sportsmen.filter((s) => !s.coach_id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📋 Murabbiylarni boshqarish
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
              + Yangi coach
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi coach yaratish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Ism"
                  value={formData.ism}
                  onChange={(e) =>
                    setFormData({ ...formData, ism: e.target.value })
                  }
                />
                <Input
                  placeholder="Familiya"
                  value={formData.familiya}
                  onChange={(e) =>
                    setFormData({ ...formData, familiya: e.target.value })
                  }
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                placeholder="Telefon"
                value={formData.telefon}
                onChange={(e) =>
                  setFormData({ ...formData, telefon: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Sport turlari</label>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      sport_turlari: [...formData.sport_turlari, value],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sport turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="futbol">⚽ Futbol</SelectItem>
                    <SelectItem value="basketbol">🏀 Basketbol</SelectItem>
                    <SelectItem value="voleybol">🏐 Voleybol</SelectItem>
                    <SelectItem value="tennis">🎾 Tennis</SelectItem>
                    <SelectItem value="suzish">🏊 Suzish</SelectItem>
                    <SelectItem value="kurash">🤼 Kurash</SelectItem>
                    <SelectItem value="boks">🥊 Boks</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {formData.sport_turlari.map((sport) => (
                    <Badge key={sport} variant="secondary">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleCreateCoach}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                Coach yaratish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Coach qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </CardContent>
      </Card>

      {/* Coaches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => {
          const assignedSportsmen = getSportsmenForCoach(coach);
          return (
            <Card
              key={coach.id}
              className="hover:shadow-lg transition-shadow border-0 shadow-md bg-white dark:bg-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{coach.avatar_emoji}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                      {coach.ism} {coach.familiya}
                    </h3>
                    <p className="text-sm text-slate-500">{coach.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">📞</span>
                    <span>{coach.telefon || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">🏆</span>
                    <span>
                      {assignedSportsmen.length} ta sportsman biriktirilgan
                    </span>
                  </div>
                  {coach.sport_turlari.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {coach.sport_turlari.map((sport) => (
                        <Badge key={sport} variant="outline" className="text-xs">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedCoach(coach);
                      setAssignDialogOpen(true);
                    }}
                  >
                    👥 Sportsman biriktirish
                  </Button>
                  {assignedSportsmen.length > 0 && (
                    <div className="mt-2 text-xs text-slate-500">
                      {assignedSportsmen.map((s) => s.ism).join(", ")}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCoaches.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-slate-600 dark:text-slate-400">
            Hech qanday coach topilmadi
          </p>
        </div>
      )}

      {/* Assign Sportsman Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCoach?.ism}ga sportsman biriktirish
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="max-h-60 overflow-y-auto space-y-2">
              {getUnassignedSportsmen().length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  Barcha sportsmenlar coachga biriktirilgan
                </p>
              ) : (
                getUnassignedSportsmen().map((sportsman) => (
                  <div
                    key={sportsman.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sportsman.avatar_emoji}</span>
                      <div>
                        <p className="font-medium">{sportsman.ism}</p>
                        <p className="text-sm text-slate-500">
                          {sportsman.sport}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleAssignCoach(selectedCoach!.id, sportsman.id)
                      }
                    >
                      Biriktirish
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Show already assigned sportsmen */}
            {selectedCoach && getSportsmenForCoach(selectedCoach).length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">
                  Biriktirilgan sportsmenlar:
                </h4>
                <div className="space-y-2">
                  {getSportsmenForCoach(selectedCoach).map((sportsman) => (
                    <div
                      key={sportsman.id}
                      className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span>{sportsman.avatar_emoji}</span>
                        <span className="text-sm">{sportsman.ism}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          removeCoachFromSportsman(sportsman.id)
                        }
                      >
                        ❌
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
