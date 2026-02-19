"use client";

import "@/styles/landing.css";
import "@/styles/tv.css";

import {
  Navbar,
  HeroSection,
  Features,
  SportsTypes,
  Competitions,
  TopAthletes,
  Clubs,
  CTASection,
  Footer,
} from "@/components/landing";

export default function HomePage() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <Features />
      <SportsTypes />
      <Competitions />
      <TopAthletes />
      <Clubs />
      <CTASection />
      <Footer />
    </div>
  );
}
