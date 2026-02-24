"use client";

import { NewsCard } from "@/components/shared/NewsCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/store";

export default function YangiliklarPage() {
  const { yangiliklar } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader title="Yangiliklar" />

      <div className="space-y-6">
        {yangiliklar.map((yangilik) => (
          <NewsCard key={yangilik.id} yangilik={yangilik} />
        ))}
      </div>

      {yangiliklar.length === 0 && (
        <EmptyState emoji="📰" message="Hech qanday yangilik topilmadi" />
      )}
    </div>
  );
}
