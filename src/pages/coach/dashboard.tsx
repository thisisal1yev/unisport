"use client";

import { useApp } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, MapPin, Calendar, TrendingUp } from "lucide-react";
import type { NextPage } from "next";

const CoachDashboard: NextPage = () => {
  const { sportchilar, musobaqalar, klublar, sportJoylari, currentUser } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Murabbiy paneli</h1>
        <Badge variant="outline" className="text-lg px-4 py-1">
          {currentUser?.ism || "Murabbiy"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sportchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sportchilar.length}</div>
            <p className="text-xs text-muted-foreground">jami sportchilar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Musobaqalar</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musobaqalar.length}</div>
            <p className="text-xs text-muted-foreground">jami musobaqalar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Klublar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{klublar.length}</div>
            <p className="text-xs text-muted-foreground">jami klublar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sport Joylari</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sportJoylari.length}</div>
            <p className="text-xs text-muted-foreground">jami sport joylari</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Yaqinlashayotgan musobaqalar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {musobaqalar.slice(0, 5).map((musobaqa) => (
                <div
                  key={musobaqa.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{musobaqa.nomi}</p>
                    <p className="text-sm text-muted-foreground">
                      {musobaqa.sana} | {musobaqa.joy}
                    </p>
                  </div>
                  <Badge>{musobaqa.holat}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Oxirgi ro'yxatga olingan sportchilar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sportchilar.slice(0, 5).map((sportchi) => (
                <div
                  key={sportchi.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{sportchi.ism}</p>
                    <p className="text-sm text-muted-foreground">
                      {sportchi.sport} | {sportchi.klub || "Klubsiz"}
                    </p>
                  </div>
                  <Badge variant="outline">{sportchi.daraja}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoachDashboard;
