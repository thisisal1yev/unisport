import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanSportchilar = dynamic(() => import("@/components/sportsman/SportsmanSportchilar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanSportchilarPage() {
  return <SportsmanSportchilar />;
}
