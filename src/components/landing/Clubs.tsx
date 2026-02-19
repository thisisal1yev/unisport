"use client";

import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { klublar } from "@/lib/mock-data";

export function Clubs() {
  return (
    <section id="klublar" className="clubs-section">
      <div className="clubs-container">
        <div className="clubs-header">
          <div>
            <h2 className="clubs-title">Sport klublari</h2>
            <p className="clubs-subtitle">
              O'zingizga mos klubni tanlang va a'zo bo'ling
            </p>
          </div>
          <Link href="/sportsman/klublar">
            <Button className="clubs-view-btn">
              Barcha klublar
              <ChevronRight className="clubs-chevron" />
            </Button>
          </Link>
        </div>

        <div className="clubs-grid">
          {klublar.slice(0, 3).map((klub) => (
            <Card key={klub.id} className="club-card">
              <CardContent className="club-card-content">
                <div className="club-info">
                  <div className="club-emoji">{klub.rasm_emoji}</div>
                  <div>
                    <h3 className="club-name">{klub.nomi}</h3>
                    <p className="club-sport">{klub.sport_turi}</p>
                  </div>
                </div>

                <p className="club-desc">{klub.tavsif}</p>

                <div className="club-footer">
                  <div className="club-members">
                    <Users className="club-members-icon" />
                    <span>{klub.azolar_soni} a'zo</span>
                  </div>
                  <Button className="club-join-btn">Qo'shilish</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
