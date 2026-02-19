"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sportTurlari } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SportTypes() {
  return (
    <section id="sport-turlari" className="sport-types-section">
      <div className="sport-types-container">
        <div className="sport-types-header">
          <div>
            <h2 className="sport-types-title">Sport turlari</h2>
            <p className="sport-types-subtitle">
              12 xil sport turidan birini tanlang va professional bo'ling
            </p>
          </div>
          <Link href="/sportsman/sport-turlari">
            <Button
              variant="ghost"
              className="sport-types-link-btn"
            >
              Barchasini ko'rish
              <ChevronRight className="sport-types-link-icon" />
            </Button>
          </Link>
        </div>

        <div className="sport-types-grid">
          {sportTurlari.slice(0, 12).map((sport) => (
            <Link
              key={sport.id}
              href="/sportsman/sport-turlari"
              className="sport-types-item"
            >
              <Card className="sport-types-card">
                <CardContent className="sport-types-card-content">
                  <div className="sport-types-emoji">
                    {sport.rasm_emoji}
                  </div>
                  <h3 className="sport-types-name">
                    {sport.nomi}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
