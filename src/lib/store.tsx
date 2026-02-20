"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";
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

interface RegisterInput {
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
}

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
  isLoading: boolean;

  // User state
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;

  // Auth functions (async)
  register: (
    userData: RegisterInput,
  ) => Promise<{ success: boolean; message: string }>;
  login: (
    email: string,
    parol: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;

  // User management (admin)
  deleteUser: (id: string) => Promise<void>;
  toggleUserAdmin: (id: string) => Promise<void>;

  // Participation functions
  joinKlub: (klubId: number) => Promise<void>;
  leaveKlub: (klubId: number) => Promise<void>;
  joinMusobaqa: (musobaqaId: number) => Promise<void>;
  leaveMusobaqa: (musobaqaId: number) => Promise<void>;

  // CRUD operations
  addSportJoy: (joy: Omit<SportJoy, "id">) => Promise<void>;
  updateSportJoy: (id: number, joy: Partial<SportJoy>) => Promise<void>;
  deleteSportJoy: (id: number) => Promise<void>;

  addMusobaqa: (musobaqa: Omit<Musobaqa, "id">) => Promise<void>;
  updateMusobaqa: (id: number, musobaqa: Partial<Musobaqa>) => Promise<void>;
  deleteMusobaqa: (id: number) => Promise<void>;

  addSportchi: (sportchi: Omit<Sportchi, "id">) => Promise<void>;
  updateSportchi: (id: number, sportchi: Partial<Sportchi>) => Promise<void>;
  deleteSportchi: (id: number) => Promise<void>;

  addKlub: (klub: Omit<Klub, "id">) => Promise<void>;
  updateKlub: (id: number, klub: Partial<Klub>) => Promise<void>;
  deleteKlub: (id: number) => Promise<void>;

  addYutuq: (yutuq: Omit<Yutuq, "id">) => Promise<void>;
  deleteYutuq: (id: number) => Promise<void>;

  addYangilik: (yangilik: Omit<Yangilik, "id">) => Promise<void>;
  updateYangilik: (id: number, yangilik: Partial<Yangilik>) => Promise<void>;
  deleteYangilik: (id: number) => Promise<void>;
  likeYangilik: (id: number) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Map Supabase profile row → User
function profileToUser(
  profile: Record<string, unknown>,
  email: string,
  klublar_ids: number[] = [],
  musobaqalar_ids: number[] = [],
): User {
  return {
    id: profile.id as string,
    ism: (profile.ism as string) ?? "",
    familiya: (profile.familiya as string) ?? "",
    email,
    telefon: profile.telefon as string | undefined,
    tug_sana: profile.tug_sana as string | undefined,
    fakultet: profile.fakultet as string | undefined,
    guruh: profile.guruh as string | undefined,
    vazn: profile.vazn as number | undefined,
    boy: profile.boy as number | undefined,
    avatar_emoji: (profile.avatar_emoji as string) ?? "🧑",
    bio: profile.bio as string | undefined,
    sport_turlari: (profile.sport_turlari as string[]) ?? [],
    isAdmin: (profile.is_admin as boolean) ?? false,
    klublar_ids,
    musobaqalar_ids,
    ro_yxatdan_sana:
      (profile.ro_yxatdan_sana as string) ??
      new Date().toISOString().split("T")[0],
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [sportTurlari, setSportTurlari] = useState<SportType[]>([]);
  const [sportJoylari, setSportJoylari] = useState<SportJoy[]>([]);
  const [musobaqalar, setMusobaqalar] = useState<Musobaqa[]>([]);
  const [sportchilar, setSportchilar] = useState<Sportchi[]>([]);
  const [klublar, setKlublar] = useState<Klub[]>([]);
  const [yutuqlar, setYutuqlar] = useState<Yutuq[]>([]);
  const [yangiliklar, setYangiliklar] = useState<Yangilik[]>([]);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  // User state
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load all public data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [joylari, musobaqa, sportchi, klub, yutuq, yangilik, profiles, sportTurlariRes] =
        await Promise.all([
          supabase.from("sport_joylari").select("*").order("id"),
          supabase.from("musobaqalar").select("*").order("id"),
          supabase.from("sportchilar").select("*").order("id"),
          supabase.from("klublar").select("*").order("id"),
          supabase.from("yutuqlar").select("*").order("id"),
          supabase.from("yangiliklar").select("*").order("id"),
          supabase.from("profiles").select("*").order("ro_yxatdan_sana"),
          supabase.from("sport_turlari").select("*").order("id"),
        ]);

      if (joylari.data) setSportJoylari(joylari.data as SportJoy[]);
      if (musobaqa.data) setMusobaqalar(musobaqa.data as Musobaqa[]);
      if (sportchi.data) setSportchilar(sportchi.data as Sportchi[]);
      if (klub.data) setKlublar(klub.data as Klub[]);
      if (yutuq.data) setYutuqlar(yutuq.data as Yutuq[]);
      if (yangilik.data) setYangiliklar(yangilik.data as Yangilik[]);
      if (profiles.data) {
        const mapped = profiles.data.map((p) =>
          profileToUser(p as Record<string, unknown>, ""),
        );
        setUsers(mapped);
      }
      if (sportTurlariRes.data) setSportTurlari(sportTurlariRes.data as SportType[]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Auth state listener
  useEffect(() => {
    const loadUserProfile = async (userId: string, email: string) => {
      const [profileRes, klublarRes, musobaqalarRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase
          .from("user_klublar")
          .select("klub_id")
          .eq("user_id", userId),
        supabase
          .from("user_musobaqalar")
          .select("musobaqa_id")
          .eq("user_id", userId),
      ]);

      if (profileRes.data) {
        const klubIds =
          klublarRes.data?.map((r: { klub_id: number }) => r.klub_id) ?? [];
        const musobaqaIds =
          musobaqalarRes.data?.map(
            (r: { musobaqa_id: number }) => r.musobaqa_id,
          ) ?? [];
        const user = profileToUser(
          profileRes.data as Record<string, unknown>,
          email,
          klubIds,
          musobaqaIds,
        );
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email ?? "");
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email ?? "");
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth functions
  const register = async (
    userData: RegisterInput,
  ): Promise<{ success: boolean; message: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.parol,
      options: {
        data: {
          ism: userData.ism,
          familiya: userData.familiya,
          avatar_emoji: userData.avatar_emoji,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }

    // Update profile with additional fields after trigger creates it
    if (data.user) {
      await supabase
        .from("profiles")
        .update({
          telefon: userData.telefon ?? null,
          tug_sana: userData.tug_sana ?? null,
          fakultet: userData.fakultet ?? null,
          guruh: userData.guruh ?? null,
          vazn: userData.vazn ?? null,
          boy: userData.boy ?? null,
          bio: userData.bio ?? null,
          sport_turlari: userData.sport_turlari,
        })
        .eq("id", data.user.id);
    }

    return { success: true, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" };
  };

  const login = async (
    email: string,
    parol: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: parol,
    });

    if (error) {
      return { success: false, message: "Email yoki parol noto'g'ri" };
    }

    return { success: true, message: "Muvaffaqiyatli kirdingiz!" };
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        ism: data.ism,
        familiya: data.familiya,
        telefon: data.telefon,
        tug_sana: data.tug_sana,
        fakultet: data.fakultet,
        guruh: data.guruh,
        vazn: data.vazn,
        boy: data.boy,
        avatar_emoji: data.avatar_emoji,
        bio: data.bio,
        sport_turlari: data.sport_turlari,
      })
      .eq("id", currentUser.id);

    if (!error) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );
    }
  };

  // User management (admin)
  const deleteUser = async (id: string): Promise<void> => {
    await supabase.from("profiles").delete().eq("id", id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleUserAdmin = async (id: string): Promise<void> => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const newIsAdmin = !user.isAdmin;
    const { error } = await supabase
      .from("profiles")
      .update({ is_admin: newIsAdmin })
      .eq("id", id);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isAdmin: newIsAdmin } : u)),
      );
      if (currentUser?.id === id) {
        setCurrentUser((prev) =>
          prev ? { ...prev, isAdmin: newIsAdmin } : prev,
        );
      }
    }
  };

  // Participation functions
  const joinKlub = async (klubId: number): Promise<void> => {
    if (!currentUser) return;
    if (currentUser.klublar_ids.includes(klubId)) return;

    const { error } = await supabase
      .from("user_klublar")
      .insert({ user_id: currentUser.id, klub_id: klubId });

    if (!error) {
      const updatedUser = {
        ...currentUser,
        klublar_ids: [...currentUser.klublar_ids, klubId],
      };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );
      setKlublar((prev) =>
        prev.map((k) =>
          k.id === klubId ? { ...k, azolar_soni: k.azolar_soni + 1 } : k,
        ),
      );
      await supabase
        .from("klublar")
        .update({ azolar_soni: (klublar.find((k) => k.id === klubId)?.azolar_soni ?? 0) + 1 })
        .eq("id", klubId);
    }
  };

  const leaveKlub = async (klubId: number): Promise<void> => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("user_klublar")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("klub_id", klubId);

    if (!error) {
      const updatedUser = {
        ...currentUser,
        klublar_ids: currentUser.klublar_ids.filter((id) => id !== klubId),
      };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );
      setKlublar((prev) =>
        prev.map((k) =>
          k.id === klubId
            ? { ...k, azolar_soni: Math.max(0, k.azolar_soni - 1) }
            : k,
        ),
      );
      await supabase
        .from("klublar")
        .update({ azolar_soni: Math.max(0, (klublar.find((k) => k.id === klubId)?.azolar_soni ?? 1) - 1) })
        .eq("id", klubId);
    }
  };

  const joinMusobaqa = async (musobaqaId: number): Promise<void> => {
    if (!currentUser) return;

    const musobaqa = musobaqalar.find((m) => m.id === musobaqaId);
    if (
      !musobaqa ||
      musobaqa.ishtirokchilar_soni >= musobaqa.maksimal_ishtirokchilar
    )
      return;
    if (currentUser.musobaqalar_ids.includes(musobaqaId)) return;

    const { error } = await supabase
      .from("user_musobaqalar")
      .insert({ user_id: currentUser.id, musobaqa_id: musobaqaId });

    if (!error) {
      const updatedUser = {
        ...currentUser,
        musobaqalar_ids: [...currentUser.musobaqalar_ids, musobaqaId],
      };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );
      setMusobaqalar((prev) =>
        prev.map((m) =>
          m.id === musobaqaId
            ? { ...m, ishtirokchilar_soni: m.ishtirokchilar_soni + 1 }
            : m,
        ),
      );
      await supabase
        .from("musobaqalar")
        .update({ ishtirokchilar_soni: musobaqa.ishtirokchilar_soni + 1 })
        .eq("id", musobaqaId);
    }
  };

  const leaveMusobaqa = async (musobaqaId: number): Promise<void> => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("user_musobaqalar")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("musobaqa_id", musobaqaId);

    if (!error) {
      const musobaqa = musobaqalar.find((m) => m.id === musobaqaId);
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
      if (musobaqa) {
        await supabase
          .from("musobaqalar")
          .update({
            ishtirokchilar_soni: Math.max(
              0,
              musobaqa.ishtirokchilar_soni - 1,
            ),
          })
          .eq("id", musobaqaId);
      }
    }
  };

  // Sport Joylari CRUD
  const addSportJoy = async (joy: Omit<SportJoy, "id">): Promise<void> => {
    const { data, error } = await supabase
      .from("sport_joylari")
      .insert(joy)
      .select()
      .single();
    if (!error && data) setSportJoylari((prev) => [...prev, data as SportJoy]);
  };

  const updateSportJoy = async (
    id: number,
    joy: Partial<SportJoy>,
  ): Promise<void> => {
    const { error } = await supabase
      .from("sport_joylari")
      .update(joy)
      .eq("id", id);
    if (!error)
      setSportJoylari((prev) =>
        prev.map((j) => (j.id === id ? { ...j, ...joy } : j)),
      );
  };

  const deleteSportJoy = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("sport_joylari")
      .delete()
      .eq("id", id);
    if (!error) setSportJoylari((prev) => prev.filter((j) => j.id !== id));
  };

  // Musobaqalar CRUD
  const addMusobaqa = async (
    musobaqa: Omit<Musobaqa, "id">,
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("musobaqalar")
      .insert(musobaqa)
      .select()
      .single();
    if (!error && data) setMusobaqalar((prev) => [...prev, data as Musobaqa]);
  };

  const updateMusobaqa = async (
    id: number,
    musobaqa: Partial<Musobaqa>,
  ): Promise<void> => {
    const { error } = await supabase
      .from("musobaqalar")
      .update(musobaqa)
      .eq("id", id);
    if (!error)
      setMusobaqalar((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...musobaqa } : m)),
      );
  };

  const deleteMusobaqa = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("musobaqalar")
      .delete()
      .eq("id", id);
    if (!error) setMusobaqalar((prev) => prev.filter((m) => m.id !== id));
  };

  // Sportchilar CRUD
  const addSportchi = async (
    sportchi: Omit<Sportchi, "id">,
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("sportchilar")
      .insert(sportchi)
      .select()
      .single();
    if (!error && data) setSportchilar((prev) => [...prev, data as Sportchi]);
  };

  const updateSportchi = async (
    id: number,
    sportchi: Partial<Sportchi>,
  ): Promise<void> => {
    const { error } = await supabase
      .from("sportchilar")
      .update(sportchi)
      .eq("id", id);
    if (!error)
      setSportchilar((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...sportchi } : s)),
      );
  };

  const deleteSportchi = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("sportchilar")
      .delete()
      .eq("id", id);
    if (!error) setSportchilar((prev) => prev.filter((s) => s.id !== id));
  };

  // Klublar CRUD
  const addKlub = async (klub: Omit<Klub, "id">): Promise<void> => {
    const { data, error } = await supabase
      .from("klublar")
      .insert(klub)
      .select()
      .single();
    if (!error && data) setKlublar((prev) => [...prev, data as Klub]);
  };

  const updateKlub = async (id: number, klub: Partial<Klub>): Promise<void> => {
    const { error } = await supabase
      .from("klublar")
      .update(klub)
      .eq("id", id);
    if (!error)
      setKlublar((prev) =>
        prev.map((k) => (k.id === id ? { ...k, ...klub } : k)),
      );
  };

  const deleteKlub = async (id: number): Promise<void> => {
    const { error } = await supabase.from("klublar").delete().eq("id", id);
    if (!error) setKlublar((prev) => prev.filter((k) => k.id !== id));
  };

  // Yutuqlar CRUD
  const addYutuq = async (yutuq: Omit<Yutuq, "id">): Promise<void> => {
    const { data, error } = await supabase
      .from("yutuqlar")
      .insert(yutuq)
      .select()
      .single();
    if (!error && data) setYutuqlar((prev) => [...prev, data as Yutuq]);
  };

  const deleteYutuq = async (id: number): Promise<void> => {
    const { error } = await supabase.from("yutuqlar").delete().eq("id", id);
    if (!error) setYutuqlar((prev) => prev.filter((y) => y.id !== id));
  };

  // Yangiliklar CRUD
  const addYangilik = async (
    yangilik: Omit<Yangilik, "id">,
  ): Promise<void> => {
    const { data, error } = await supabase
      .from("yangiliklar")
      .insert(yangilik)
      .select()
      .single();
    if (!error && data) setYangiliklar((prev) => [...prev, data as Yangilik]);
  };

  const updateYangilik = async (
    id: number,
    yangilik: Partial<Yangilik>,
  ): Promise<void> => {
    const { error } = await supabase
      .from("yangiliklar")
      .update(yangilik)
      .eq("id", id);
    if (!error)
      setYangiliklar((prev) =>
        prev.map((y) => (y.id === id ? { ...y, ...yangilik } : y)),
      );
  };

  const deleteYangilik = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("yangiliklar")
      .delete()
      .eq("id", id);
    if (!error) setYangiliklar((prev) => prev.filter((y) => y.id !== id));
  };

  const likeYangilik = async (id: number): Promise<void> => {
    const current = yangiliklar.find((y) => y.id === id);
    if (!current) return;
    const newLayklar = current.layklar + 1;
    setYangiliklar((prev) =>
      prev.map((y) => (y.id === id ? { ...y, layklar: newLayklar } : y)),
    );
    await supabase
      .from("yangiliklar")
      .update({ layklar: newLayklar })
      .eq("id", id);
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
        isLoading,
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
