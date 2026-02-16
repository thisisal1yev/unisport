"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  SportType,
  SportJoy,
  Musobaqa,
  Sportchi,
  Klub,
  Yutuq,
  Yangilik,
} from "./types";
import {
  sportTurlari as initialSportTurlari,
  sportJoylari as initialSportJoylari,
  musobaqalar as initialMusobaqalar,
  sportchilar as initialSportchilar,
  klublar as initialKlublar,
  yutuqlar as initialYutuqlar,
  yangiliklar as initialYangiliklar,
} from "./mock-data";

interface AppState {
  sportTurlari: SportType[];
  sportJoylari: SportJoy[];
  musobaqalar: Musobaqa[];
  sportchilar: Sportchi[];
  klublar: Klub[];
  yutuqlar: Yutuq[];
  yangiliklar: Yangilik[];
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // CRUD operations
  addSportJoy: (joy: Omit<SportJoy, "id">) => void;
  updateSportJoy: (id: number, joy: Partial<SportJoy>) => void;
  deleteSportJoy: (id: number) => void;

  addMusobaqa: (musobaqa: Omit<Musobaqa, "id">) => void;
  updateMusobaqa: (id: number, musobaqa: Partial<Musobaqa>) => void;
  deleteMusobaqa: (id: number) => void;

  addKlub: (klub: Omit<Klub, "id">) => void;
  deleteKlub: (id: number) => void;

  addYutuq: (yutuq: Omit<Yutuq, "id">) => void;
  deleteYutuq: (id: number) => void;

  addYangilik: (yangilik: Omit<Yangilik, "id">) => void;
  updateYangilik: (id: number, yangilik: Partial<Yangilik>) => void;
  deleteYangilik: (id: number) => void;
  likeYangilik: (id: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sportTurlari] = useState<SportType[]>(initialSportTurlari);
  const [sportJoylari, setSportJoylari] = useState<SportJoy[]>(initialSportJoylari);
  const [musobaqalar, setMusobaqalar] = useState<Musobaqa[]>(initialMusobaqalar);
  const [sportchilar] = useState<Sportchi[]>(initialSportchilar);
  const [klublar, setKlublar] = useState<Klub[]>(initialKlublar);
  const [yutuqlar, setYutuqlar] = useState<Yutuq[]>(initialYutuqlar);
  const [yangiliklar, setYangiliklar] = useState<Yangilik[]>(initialYangiliklar);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Sport Joylari CRUD
  const addSportJoy = (joy: Omit<SportJoy, "id">) => {
    const newId = Math.max(...sportJoylari.map((j) => j.id), 0) + 1;
    setSportJoylari([...sportJoylari, { ...joy, id: newId }]);
  };

  const updateSportJoy = (id: number, joy: Partial<SportJoy>) => {
    setSportJoylari(
      sportJoylari.map((j) => (j.id === id ? { ...j, ...joy } : j))
    );
  };

  const deleteSportJoy = (id: number) => {
    setSportJoylari(sportJoylari.filter((j) => j.id !== id));
  };

  // Musobaqalar CRUD
  const addMusobaqa = (musobaqa: Omit<Musobaqa, "id">) => {
    const newId = Math.max(...musobaqalar.map((m) => m.id), 0) + 1;
    setMusobaqalar([...musobaqalar, { ...musobaqa, id: newId }]);
  };

  const updateMusobaqa = (id: number, musobaqa: Partial<Musobaqa>) => {
    setMusobaqalar(
      musobaqalar.map((m) => (m.id === id ? { ...m, ...musobaqa } : m))
    );
  };

  const deleteMusobaqa = (id: number) => {
    setMusobaqalar(musobaqalar.filter((m) => m.id !== id));
  };

  // Klublar CRUD
  const addKlub = (klub: Omit<Klub, "id">) => {
    const newId = Math.max(...klublar.map((k) => k.id), 0) + 1;
    setKlublar([...klublar, { ...klub, id: newId }]);
  };

  const deleteKlub = (id: number) => {
    setKlublar(klublar.filter((k) => k.id !== id));
  };

  // Yutuqlar CRUD
  const addYutuq = (yutuq: Omit<Yutuq, "id">) => {
    const newId = Math.max(...yutuqlar.map((y) => y.id), 0) + 1;
    setYutuqlar([...yutuqlar, { ...yutuq, id: newId }]);
  };

  const deleteYutuq = (id: number) => {
    setYutuqlar(yutuqlar.filter((y) => y.id !== id));
  };

  // Yangiliklar CRUD
  const addYangilik = (yangilik: Omit<Yangilik, "id">) => {
    const newId = Math.max(...yangiliklar.map((y) => y.id), 0) + 1;
    setYangiliklar([...yangiliklar, { ...yangilik, id: newId }]);
  };

  const updateYangilik = (id: number, yangilik: Partial<Yangilik>) => {
    setYangiliklar(
      yangiliklar.map((y) => (y.id === id ? { ...y, ...yangilik } : y))
    );
  };

  const deleteYangilik = (id: number) => {
    setYangiliklar(yangiliklar.filter((y) => y.id !== id));
  };

  const likeYangilik = (id: number) => {
    setYangiliklar(
      yangiliklar.map((y) =>
        y.id === id ? { ...y, layklar: y.layklar + 1 } : y
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        sportTurlari,
        sportJoylari,
        musobaqalar,
        sportchilar,
        klublar,
        yutuqlar,
        yangiliklar,
        currentPage,
        setCurrentPage,
        addSportJoy,
        updateSportJoy,
        deleteSportJoy,
        addMusobaqa,
        updateMusobaqa,
        deleteMusobaqa,
        addKlub,
        deleteKlub,
        addYutuq,
        deleteYutuq,
        addYangilik,
        updateYangilik,
        deleteYangilik,
        likeYangilik,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
