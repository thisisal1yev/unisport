"use client";

import Link from "next/link";
import { MapPin, Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Trophy className="footer-logo-icon-svg" />
              </div>
              <span className="footer-logo-text">UniSport</span>
            </div>
            <p className="footer-desc">
              Farg'ona Davlat Texnika Universiteti sport platformasi. Barcha sport
              turlari, musobaqalar va yutuqlar bir joyda.
            </p>
            <div className="footer-socials">
              <Link href="/sportsman/dashboard" className="footer-social-link">
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </Link>
              <Link href="/coach/dashboard" className="footer-social-link">
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </Link>
              <Link href="/admin/dashboard" className="footer-social-link">
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-links-title">Platformalar</h3>
            <ul className="footer-links-list">
              {[
                { name: "Sport turlari", href: "/sportsman/sport-turlari" },
                { name: "Musobaqalar", href: "/sportsman/musobaqalar" },
                { name: "Sportchilar", href: "/sportsman/sportchilar" },
                { name: "Klublar", href: "/sportsman/klublar" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-contact-title">Aloqa</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span>Farg'ona shahri, Farg'ona ko'chasi 86</span>
              </li>
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>sport@fdtu.uz</span>
              </li>
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+998 73 244 0101</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 UniSport. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
