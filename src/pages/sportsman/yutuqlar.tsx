"use client";

import { TopAthletes } from "@/components/shared/TopAthletes";
import { YutuqCard } from "@/components/shared/YutuqCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/store";

export default function YutuqlarPage() {
  const { sportchilar, yutuqlar } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Yutuqlar" />

      <TopAthletes sportchilar={sportchilar} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {yutuqlar.map((yutuq) => (
          <YutuqCard key={yutuq.id} yutuq={yutuq} />
        ))}
      </div>

      {yutuqlar.length === 0 && (
        <EmptyState emoji="🏅" message="Hech qanday yutuq topilmadi" />
      )}
    </div>
  );
}
