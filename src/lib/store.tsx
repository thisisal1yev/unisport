"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  klublar as initialKlublar,
  musobaqalar as initialMusobaqalar,
  sportJoylari as initialSportJoylari,
  sportTurlari as initialSportTurlari,
  sportchilar as initialSportchilar,
  yangiliklar as initialYangiliklar,
  yutuqlar as initialYutuqlar,
  guruhlar as initialGuruhlar,
} from "./mock-data";
import type {
  Klub,
  Musobaqa,
  SportJoy,
  SportType,
  Sportchi,
  User,
  Yangilik,
  Yutuq,
} from "./types";

interface AppState {
  sportTurlari: SportType[];
  sportJoylari: SportJoy[];
  musobaqalar: Musobaqa[];
  sportchilar: Sportchi[];
  klublar: Klub[];
  yutuqlar: Yutuq[];
  yangiliklar: Yangilik[];
  guruhlar: string[];
  addGuruh: (guruh: string) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // User state
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;

  // Auth functions
  register: (
    userData: Omit<
      User,
      "id" | "ro_yxatdan_sana" | "klublar_ids" | "musobaqalar_ids"
    >,
  ) => { success: boolean; message: string };
  login: (
    email: string,
    parol: string,
  ) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // User management (admin)
  deleteUser: (id: number) => void;
  toggleUserAdmin: (id: number) => void;

  // Participation functions
  joinKlub: (klubId: number) => void;
  leaveKlub: (klubId: number) => void;
  joinMusobaqa: (musobaqaId: number) => void;
  leaveMusobaqa: (musobaqaId: number) => void;

  // CRUD operations
  addSportJoy: (joy: Omit<SportJoy, "id">) => void;
  updateSportJoy: (id: number, joy: Partial<SportJoy>) => void;
  deleteSportJoy: (id: number) => void;

  addMusobaqa: (musobaqa: Omit<Musobaqa, "id">) => void;
  updateMusobaqa: (id: number, musobaqa: Partial<Musobaqa>) => void;
  deleteMusobaqa: (id: number) => void;

  addSportchi: (sportchi: Omit<Sportchi, "id">) => void;
  updateSportchi: (id: number, sportchi: Partial<Sportchi>) => void;
  deleteSportchi: (id: number) => void;

  addKlub: (klub: Omit<Klub, "id">) => void;
  updateKlub: (id: number, klub: Partial<Klub>) => void;
  deleteKlub: (id: number) => void;

  addYutuq: (yutuq: Omit<Yutuq, "id">) => void;
  deleteYutuq: (id: number) => void;

  addYangilik: (yangilik: Omit<Yangilik, "id">) => void;
  updateYangilik: (id: number, yangilik: Partial<Yangilik>) => void;
  deleteYangilik: (id: number) => void;
  likeYangilik: (id: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// LocalStorage keys
const GURUHLAR_KEY = "unisport_guruhlar";
const USERS_KEY = "unisport_users";
const CURRENT_USER_KEY = "unisport_current_user";

export function AppProvider({ children }: { children: ReactNode }) {
  const [sportTurlari] = useState<SportType[]>(initialSportTurlari);
  const [sportJoylari, setSportJoylari] =
    useState<SportJoy[]>(initialSportJoylari);
  const [musobaqalar, setMusobaqalar] =
    useState<Musobaqa[]>(initialMusobaqalar);
  const [sportchilar, setSportchilar] =
    useState<Sportchi[]>(initialSportchilar);
  const [klublar, setKlublar] = useState<Klub[]>(initialKlublar);
  const [yutuqlar, setYutuqlar] = useState<Yutuq[]>(initialYutuqlar);
  const [yangiliklar, setYangiliklar] = useState<Yangilik[]>(initialYangiliklar);
  const [guruhlar, setGuruhlar] = useState<string[]>(initialGuruhlar);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // User state
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(USERS_KEY);
    const savedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
    const savedGuruhlar = localStorage.getItem(GURUHLAR_KEY);

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedCurrentUser) {
      const user = JSON.parse(savedCurrentUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    if (savedGuruhlar) {
      setGuruhlar(JSON.parse(savedGuruhlar));
    }
  }, []);

  // Save users to localStorage when changed
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage when changed
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // Save guruhlar to localStorage when changed
  useEffect(() => {
    localStorage.setItem(GURUHLAR_KEY, JSON.stringify(guruhlar));
  }, [guruhlar]);

  // Auth functions
  const register = (
    userData: Omit<
      User,
      "id" | "ro_yxatdan_sana" | "klublar_ids" | "musobaqalar_ids"
    >,
  ) => {
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      return {
        success: false,
        message: "Bu email allaqachon ro'yxatdan o'tgan",
      };
    }

    const newUser: User = {
      ...userData,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      klublar_ids: [],
      musobaqalar_ids: [],
      ro_yxatdan_sana: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return { success: true, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" };
  };

  const login = (email: string, parol: string) => {
    const user = users.find((u) => u.email === email && u.parol === parol);
    if (!user) {
      return { success: false, message: "Email yoki parol noto'g'ri" };
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
    return { success: true, message: "Muvaffaqiyatli kirdingiz!" };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
    );
  };

  // User management (admin)
  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleUserAdmin = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isAdmin: !u.isAdmin } : u)),
    );
  };

  // Participation functions
  const joinKlub = (klubId: number) => {
    if (!currentUser) return;

    if (!currentUser.klublar_ids.includes(klubId)) {
      const updatedUser = {
        ...currentUser,
        klublar_ids: [...currentUser.klublar_ids, klubId],
      };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );

      // Update klub members count
      setKlublar((prev) =>
        prev.map((k) =>
          k.id === klubId ? { ...k, azolar_soni: k.azolar_soni + 1 } : k,
        ),
      );
    }
  };

  const leaveKlub = (klubId: number) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      klublar_ids: currentUser.klublar_ids.filter((id) => id !== klubId),
    };
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
    );

    // Update klub members count
    setKlublar((prev) =>
      prev.map((k) =>
        k.id === klubId
          ? { ...k, azolar_soni: Math.max(0, k.azolar_soni - 1) }
          : k,
      ),
    );
  };

  const joinMusobaqa = (musobaqaId: number) => {
    if (!currentUser) return;

    const musobaqa = musobaqalar.find((m) => m.id === musobaqaId);
    if (
      !musobaqa ||
      musobaqa.ishtirokchilar_soni >= musobaqa.maksimal_ishtirokchilar
    )
      return;

    if (!currentUser.musobaqalar_ids.includes(musobaqaId)) {
      const updatedUser = {
        ...currentUser,
        musobaqalar_ids: [...currentUser.musobaqalar_ids, musobaqaId],
      };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );

      // Update competition participants count
      setMusobaqalar((prev) =>
        prev.map((m) =>
          m.id === musobaqaId
            ? { ...m, ishtirokchilar_soni: m.ishtirokchilar_soni + 1 }
            : m,
        ),
      );
    }
  };

  const leaveMusobaqa = (musobaqaId: number) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      musobaqalar_ids: currentUser.musobaqalar_ids.filter(
        (id) => id !== musobaqaId,
      ),
    };
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
    );

    // Update competition participants count
    setMusobaqalar((prev) =>
      prev.map((m) =>
        m.id === musobaqaId
          ? {
              ...m,
              ishtirokchilar_soni: Math.max(0, m.ishtirokchilar_soni - 1),
            }
          : m,
      ),
    );
  };

  // Sport Joylari CRUD
  const addSportJoy = (joy: Omit<SportJoy, "id">) => {
    setSportJoylari((prev) => {
      const newId = Math.max(...prev.map((j) => j.id), 0) + 1;
      return [...prev, { ...joy, id: newId }];
    });
  };

  const updateSportJoy = (id: number, joy: Partial<SportJoy>) => {
    setSportJoylari((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...joy } : j)),
    );
  };

  const deleteSportJoy = (id: number) => {
    setSportJoylari((prev) => prev.filter((j) => j.id !== id));
  };

  // Musobaqalar CRUD
  const addMusobaqa = (musobaqa: Omit<Musobaqa, "id">) => {
    setMusobaqalar((prev) => {
      const newId = Math.max(...prev.map((m) => m.id), 0) + 1;
      return [...prev, { ...musobaqa, id: newId }];
    });
  };

  const updateMusobaqa = (id: number, musobaqa: Partial<Musobaqa>) => {
    setMusobaqalar((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...musobaqa } : m)),
    );
  };

  const deleteMusobaqa = (id: number) => {
    setMusobaqalar((prev) => prev.filter((m) => m.id !== id));
  };

  // Sportchilar CRUD
  const addSportchi = (sportchi: Omit<Sportchi, "id">) => {
    setSportchilar((prev) => {
      const newId = Math.max(...prev.map((s) => s.id), 0) + 1;
      return [...prev, { ...sportchi, id: newId }];
    });
  };

  const updateSportchi = (id: number, sportchi: Partial<Sportchi>) => {
    setSportchilar((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...sportchi } : s)),
    );
  };

  const deleteSportchi = (id: number) => {
    setSportchilar((prev) => prev.filter((s) => s.id !== id));
  };

  // Klublar CRUD
  const addKlub = (klub: Omit<Klub, "id">) => {
    setKlublar((prev) => {
      const newId = Math.max(...prev.map((k) => k.id), 0) + 1;
      return [...prev, { ...klub, id: newId }];
    });
  };

  const updateKlub = (id: number, klub: Partial<Klub>) => {
    setKlublar((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...klub } : k)),
    );
  };

  const deleteKlub = (id: number) => {
    setKlublar((prev) => prev.filter((k) => k.id !== id));
  };

  // Yutuqlar CRUD
  const addYutuq = (yutuq: Omit<Yutuq, "id">) => {
    setYutuqlar((prev) => {
      const newId = Math.max(...prev.map((y) => y.id), 0) + 1;
      return [...prev, { ...yutuq, id: newId }];
    });
  };

  const deleteYutuq = (id: number) => {
    setYutuqlar((prev) => prev.filter((y) => y.id !== id));
  };

  // Yangiliklar CRUD
  const addYangilik = (yangilik: Omit<Yangilik, "id">) => {
    setYangiliklar((prev) => {
      const newId = Math.max(...prev.map((y) => y.id), 0) + 1;
      return [...prev, { ...yangilik, id: newId }];
    });
  };

  const updateYangilik = (id: number, yangilik: Partial<Yangilik>) => {
    setYangiliklar((prev) =>
      prev.map((y) => (y.id === id ? { ...y, ...yangilik } : y)),
    );
  };

  const deleteYangilik = (id: number) => {
    setYangiliklar((prev) => prev.filter((y) => y.id !== id));
  };

  const likeYangilik = (id: number) => {
    setYangiliklar((prev) =>
      prev.map((y) =>
        y.id === id ? { ...y, layklar: y.layklar + 1 } : y,
      ),
    );
  };

  // Guruhlar functions
  const addGuruh = (guruh: string) => {
    if (guruh.trim() && !guruhlar.includes(guruh)) {
      setGuruhlar((prev) => [...prev, guruh]);
    }
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
        guruhlar,
        addGuruh,
        currentPage,
        setCurrentPage,
        // User state
        currentUser,
        users,
        isAuthenticated,
        // Auth functions
        register,
        login,
        logout,
        updateProfile,
        // User management (admin)
        deleteUser,
        toggleUserAdmin,
        // Participation functions
        joinKlub,
        leaveKlub,
        joinMusobaqa,
        leaveMusobaqa,
        // CRUD
        addSportJoy,
        updateSportJoy,
        deleteSportJoy,
        addMusobaqa,
        updateMusobaqa,
        deleteMusobaqa,
        addSportchi,
        updateSportchi,
        deleteSportchi,
        addKlub,
        updateKlub,
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
