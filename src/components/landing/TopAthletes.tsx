"use client";

import Link from "next/link";
import { ChevronRight, Crown, Medal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sportchilar } from "@/lib/mock-data";

export function TopAthletes() {
  return (
    <section id="sportchilar" className="athletes-section">
      <div className="athletes-container">
        <div className="athletes-header">
          <div>
            <h2 className="athletes-title">Top sportchilar</h2>
            <p className="athletes-subtitle">
              Eng ko'p yutuqlarga erishgan sportchilarimiz
            </p>
          </div>
          <Link href="/sportsman/sportchilar">
            <Button className="athletes-view-btn">
              Barcha sportchilar
              <ChevronRight className="athletes-chevron" />
            </Button>
          </Link>
        </div>

        <div className="athletes-grid">
          {sportchilar
            .sort((a, b) => b.medallar - a.medallar)
            .slice(0, 4)
            .map((sportchi, index) => (
              <Card key={sportchi.id} className="athlete-card">
                {index === 0 && (
                  <div className="athlete-crown">
                    <Crown className="athlete-crown-icon" />
                  </div>
                )}
                <CardContent className="athlete-card-content">
                  <div className="athlete-avatar">{sportchi.avatar_emoji}</div>
                  <h3 className="athlete-name">{sportchi.ism}</h3>
                  <p className="athlete-sport">{sportchi.sport}</p>

                  <div className="athlete-stars">
                    {Array.from({ length: sportchi.yulduzlar }).map((_, i) => (
                      <Star key={i} className="athlete-star" />
                    ))}
                  </div>

                  <div className="athlete-stats">
                    <div className="athlete-medals">
                      <Medal className="athlete-medal-icon" />
                      <span>{sportchi.medallar}</span>
                    </div>
                    <Badge variant="secondary" className="athlete-rank">
                      {sportchi.daraja}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
