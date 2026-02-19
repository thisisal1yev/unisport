// Sport Types
export interface SportType {
  id: number;
  nomi: string;
  tavsif: string;
  tarix: string;
  rasm_emoji: string;
  rasm?: string;
  youtube_havola?: string;
  asos_solingan?: string;
  jamoa_hajmi?: string;
  maydon_olchami?: string;
  qoidalar?: string;
  faktlar?: string[];
}

// Sport Locations
export interface SportJoy {
  id: number;
  nomi: string;
  manzil: string;
  kenglik: number;
  uzunlik: number;
  viloyat?: string;
  tuman: string;
  sport_turlari: string[];
  telefon?: string;
  ish_vaqti?: string;
  reyting: number;
}

// Competitions
export interface Musobaqa {
  id: number;
  nomi: string;
  kategoriya: string;
  sana: string;
  joy: string;
  ishtirokchilar_soni: number;
  maksimal_ishtirokchilar: number;
  holat: "kelgusi" | "faol" | "yakunlangan";
  rasm_emoji: string;
  tavsif?: string;
  mukofotlar?: string;
}

// Athletes
export interface Sportchi {
  id: number;
  ism: string;
  sport: string;
  fakultet?: string;
  guruh?: string;
  daraja: "Boshlovchi" | "Havaskor" | "Professional";
  medallar: number;
  yulduzlar: number;
  avatar_emoji: string;
  telefon?: string;
  tug_yil?: number;
  bio?: string;
  klub?: string;
  klub_id?: number;
}

// Clubs
export interface Klub {
  id: number;
  nomi: string;
  tavsif: string;
  sport_turi: string;
  rasm_emoji: string;
  azolar_soni: number;
  lider?: {
    id: number;
    ism: string;
    sport: string;
    medallar: number;
    yulduzlar: number;
  };
}

// Achievements
export interface Yutuq {
  id: number;
  nomi: string;
  sportchi: {
    id: number;
    ism: string;
  };
  musobaqa: string;
  medal_turi: "oltin" | "kumush" | "bronza";
  medal_soni: number;
  sana: string;
  rasm_emoji: string;
}

// News
export interface Yangilik {
  id: number;
  sarlavha: string;
  mazmun: string;
  kategoriya: string;
  rasm_emoji: string;
  rasm?: string; // optional image URL
  sana: string;
  layklar: number;
  izohlar_soni: number;
}

// User
export interface User {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  parol: string;
  telefon?: string;
  tug_sana?: string;
  fakultet?: string;
  guruh?: string;
  vazn?: number;
  boy?: number;
  avatar_emoji: string;
  bio?: string;
  sport_turlari: string[];
  isAdmin?: boolean;
  klublar_ids: number[];
  musobaqalar_ids: number[];
  ro_yxatdan_sana: string;
}
