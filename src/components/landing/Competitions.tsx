"use client";

import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { musobaqalar } from "@/lib/mock-data";

export function Competitions() {
  const kelgusiMusobaqalar = musobaqalar.filter((m) => m.holat === "kelgusi");
  const faolMusobaqalar = musobaqalar.filter((m) => m.holat === "faol");

  const getBadgeClass = (status: string) => {
    if (status === "faol") return "badge-active";
    if (status === "kelgusi") return "badge-upcoming";
    return "badge-completed";
  };

  const getBadgeText = (status: string) => {
    if (status === "faol") return "Faol";
    if (status === "kelgusi") return "Kelgusi";
    return "Yakunlangan";
  };

  return (
    <section id="musobaqalar" className="competitions-section">
      <div className="competitions-container">
        <div className="competitions-header">
          <div>
            <h2 className="competitions-title">Yaqinlashib kelayotgan musobaqalar</h2>
            <p className="competitions-subtitle">
              Ishtirok etish uchun ro'yxatdan o'ting
            </p>
          </div>
          <Link href="/sportsman/musobaqalar">
            <Button className="competitions-view-btn">
              Barcha musobaqalar
              <ChevronRight className="competitions-chevron" />
            </Button>
          </Link>
        </div>

        <div className="competitions-grid">
          {[...faolMusobaqalar, ...kelgusiMusobaqalar]
            .slice(0, 3)
            .map((musobaqa) => (
              <Card key={musobaqa.id} className="competition-card">
                <CardContent className="competition-card-content">
                  <div className="competition-header">
                    <div className="competition-emoji">{musobaqa.rasm_emoji}</div>
                    <Badge className={getBadgeClass(musobaqa.holat)}>
                      {getBadgeText(musobaqa.holat)}
                    </Badge>
                  </div>

                  <h3 className="competition-name">{musobaqa.nomi}</h3>

                  <div className="competition-info">
                    <div className="competition-info-item">
                      <Calendar className="competition-info-icon" />
                      <span>{musobaqa.sana}</span>
                    </div>
                    <div className="competition-info-item">
                      <MapPin className="competition-info-icon" />
                      <span className="competition-info-truncate">{musobaqa.joy}</span>
                    </div>
                    <div className="competition-info-item">
                      <Users className="competition-info-icon" />
                      <span>
                        {musobaqa.ishtirokchilar_soni}/
                        {musobaqa.maksimal_ishtirokchilar} ishtirokchi
                      </span>
                    </div>
                  </div>

                  <div className="competition-progress">
                    <div
                      className="competition-progress-bar"
                      style={{
                        width: `${(musobaqa.ishtirokchilar_soni / musobaqa.maksimal_ishtirokchilar) * 100}%`,
                      }}
                    />
                  </div>

                  <Button className="competition-register-btn">
                    Ro'yxatdan o'tish
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
