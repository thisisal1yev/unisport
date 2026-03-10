import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanSportJoylari = dynamic(() => import("@/components/sportsman/SportsmanSportJoylari"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanSportJoylariPage() {
  return <SportsmanSportJoylari />;
}
