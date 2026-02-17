"use client";

import { useApp } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Calendar, Edit2, Save } from "lucide-react";
import { useState } from "react";
import type { NextPage } from "next";

const CoachProfil: NextPage = () => {
  const { currentUser, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ism: currentUser?.ism || "",
    email: currentUser?.email || "",
    telefon: currentUser?.telefon || "",
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
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
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Saqlash
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Shaxsiy ma'lumotlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={formData.ism}
                  onChange={(e) => setFormData({ ...formData, ism: e.target.value })}
                  placeholder="Ismingiz"
                />
              ) : (
                <span>{currentUser.ism} {currentUser.familiya}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
              ) : (
                <span>{currentUser.email}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  placeholder="Telefon"
                />
              ) : (
                <span>{currentUser.telefon || "Ko'rsatilmagan"}</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Qo'shimcha ma'lumotlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Badge variant="outline">{currentUser.musobaqalar_ids.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoachProfil;
