"use client";

interface EmptyStateProps {
  emoji: string;
  message: string;
}

export function EmptyState({ emoji, message }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{emoji}</div>
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
}
