"use client";

import { useApp } from "@/lib/store";
import { AppProvider } from "@/lib/store";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Sidebar } from "@/components/ui/sidebar";
import { DashboardPage } from "@/components/pages/dashboard-page";
import { SportTurlariPage } from "@/components/pages/sport-turlari-page";
import { SportJoylariPage } from "@/components/pages/sport-joylari-page";
import { MusobaqalarPage } from "@/components/pages/musobaqalar-page";
import { KlublarPage } from "@/components/pages/klublar-page";
import { SportchilarPage } from "@/components/pages/sportchilar-page";
import { YutuqlarPage } from "@/components/pages/yutuqlar-page";
import { YangiliklarPage } from "@/components/pages/yangiliklar-page";

function PageContent() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case "sport-turlari":
      return <SportTurlariPage />;
    case "sport-joylari":
      return <SportJoylariPage />;
    case "musobaqalar":
      return <MusobaqalarPage />;
    case "klublar":
      return <KlublarPage />;
    case "sportchilar":
      return <SportchilarPage />;
    case "yutuqlar":
      return <YutuqlarPage />;
    case "yangiliklar":
      return <YangiliklarPage />;
    default:
      return <DashboardPage />;
  }
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <Sidebar />
          <main className="md:ml-64 p-4 md:p-8">
            <PageContent />
          </main>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}
