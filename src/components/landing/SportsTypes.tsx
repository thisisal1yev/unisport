"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sportTurlari } from "@/lib/sports-data";

export function SportsTypes() {
  return (
    <section id="sport-turlari" className="sports-section">
      <div className="sports-container">
        <div className="sports-header">
          <div>
            <h2 className="sports-title">Sport turlari</h2>
            <p className="sports-subtitle">
              12 xil sport turidan birini tanlang va professional bo'ling
            </p>
          </div>
          <Link href="/sportsman/sport-turlari">
            <Button className="sports-view-btn">
              Barchasini ko'rish
              <ChevronRight className="sports-chevron" />
            </Button>
          </Link>
        </div>

        <div className="sports-grid">
          {sportTurlari.slice(0, 12).map((sport) => (
            <Link key={sport.id} href="/sportsman/sport-turlari" className="sports-link">
              <Card className="sports-card">
                <CardContent className="sports-card-content">
                  <div className="sports-emoji">{sport.rasm_emoji}</div>
                  <h3 className="sports-name">{sport.nomi}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
