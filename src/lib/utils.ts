import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMedalEmoji(medalTuri: string) {
  switch (medalTuri) {
    case "oltin":
      return "🥇";
    case "kumush":
      return "🥈";
    case "bronza":
      return "🥉";
    default:
      return "🏅";
  }
}
